import {Buffer} from 'buffer';
import forge from 'node-forge';
import base64 from 'base-64';

import {AES, enc, HmacSHA256, SHA512, mode, pad} from 'crypto-js';
import {ec as EC} from 'elliptic-expo';
import {getRandomBytes} from 'expo-crypto';

const ec = new EC('secp256k1');

export interface CryptogramValueProps {
  TransactionDetails: {
    Amount: string;
    Currency: string;
  };
  PaymentDetails: {
    CardholderName: string;
    CardNumber: string;
    CVC: string;
    ExpMonth: string;
    ExpYear: string;
  };
  PaymentMethod: string;
  MessageExpiration?: number;
}

interface SignedMessage {
  encryptedMessage: string;
  ephemeralPublicKey: string;
}

interface EncryptedData {
  signedMessage: string;
  iv: string;
  tag: string;
}

export function getCryptogramRSAValue(
  data: CryptogramValueProps,
  rawPublicKey: string,
) {
  const token = JSON.stringify(data);
  const publicKeyPem = base64.decode(rawPublicKey);
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  const encryptedData = publicKey.encrypt(token, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: forge.mgf.mgf1.create(forge.md.sha256.create()),
  });

  return base64.encode(encryptedData);
}

function derive(
  pubKeyBytes: Buffer,
  ephemeralPrivateKey: elliptic.ec.KeyPair,
): Buffer {
  try {
    const publicKey = ec.keyFromPublic(pubKeyBytes);
    const sharedSecret = ephemeralPrivateKey.derive(publicKey.getPublic());
    return Buffer.from(sharedSecret.toArray());
  } catch (error) {
    throw error;
  }
}

async function encrypt(pubKey: string, message: string): Promise<string> {
  try {
    const pubKeyBytes = Buffer.from(pubKey, 'hex');

    const ephemeralPrivateKey = ec.genKeyPair();
    const ephemeralPublicKeyBytes = Buffer.from(
      ephemeralPrivateKey.getPublic(false, 'array'),
    );
    const ephemeralPublicKeyBase64 = ephemeralPublicKeyBytes.toString('base64');

    const sharedSecret = derive(pubKeyBytes, ephemeralPrivateKey);

    const sharedKeyHash = SHA512(
      enc.Hex.parse(sharedSecret.toString('hex')),
    ).toString(enc.Hex);

    const aesKey = enc.Hex.parse(sharedKeyHash.slice(0, 64));
    const macKey = enc.Hex.parse(sharedKeyHash.slice(64, 128));

    let ivBytes;
    try {
      ivBytes = Buffer.from(await getRandomBytes(16));
    } catch (error) {
      throw error;
    }
    const ivWordArray = enc.Hex.parse(ivBytes.toString('hex'));

    const cipher = AES.encrypt(enc.Utf8.parse(message), aesKey, {
      iv: ivWordArray,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    const cipherBytes = Buffer.from(cipher.ciphertext.toString(enc.Hex), 'hex');

    const dataToMac = Buffer.concat([
      ivBytes,
      ephemeralPublicKeyBytes,
      cipherBytes,
    ]);

    const mac = HmacSHA256(
      enc.Hex.parse(dataToMac.toString('hex')),
      macKey,
    ).toString(enc.Base64);

    const signedMessage: SignedMessage = {
      encryptedMessage: cipher.ciphertext.toString(enc.Base64),
      ephemeralPublicKey: ephemeralPublicKeyBase64,
    };

    const signedMessageStr = JSON.stringify(signedMessage);

    const encryptedData: EncryptedData = {
      signedMessage: signedMessageStr,
      iv: ivBytes.toString('base64'),
      tag: mac,
    };

    const finalString = Buffer.from(JSON.stringify(encryptedData)).toString(
      'base64',
    );

    return finalString;
  } catch (error) {
    throw error;
  }
}

export async function getCryptogramECDHValue(
  data: CryptogramValueProps,
  publicKey: string,
): Promise<string> {
  try {
    const message = JSON.stringify(data);
    return await encrypt(publicKey, message);
  } catch (error) {
    throw error;
  }
}
