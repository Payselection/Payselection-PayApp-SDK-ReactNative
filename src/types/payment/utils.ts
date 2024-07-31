import forge from 'node-forge';
import base64 from 'base-64';
export interface cryptogramValueProps {
    TransactionDetails: {
        Amount: string,
        Currency: string,
    },
    PaymentDetails: {
        CardholderName: string,
        CardNumber: string,
        CVC: string,
        ExpMonth: string,
        ExpYear: string,
    },
    PaymentMethod: string,
    MessageExpiration?: number,
}

export function getCryptogramValue(data: cryptogramValueProps, rawPublicKey: string) {
    const token = JSON.stringify(data);
    const publicKeyPem = base64.decode(rawPublicKey);
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    
    const encryptedData = publicKey.encrypt(token, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: forge.mgf.mgf1.create(forge.md.sha256.create())
    });
    
    return base64.encode(encryptedData);
}
