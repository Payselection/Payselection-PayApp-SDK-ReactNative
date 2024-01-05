import { HmacSHA256, enc } from 'crypto-js';
import { CryptogramPayment, QRCodePayment, TokenBasedPayment } from '../types/payment/paymentPayload.ts';
import { DEFAULT_ERROR_MESSAGE } from './errors.ts'

export interface SignatureProps {
  requestMethod: string;
  url: string;
  xSiteId: string;
  xRequestId: string;
  siteSecretKey: string;
  requestBody?: TokenBasedPayment | CryptogramPayment | QRCodePayment | string;
}

const extractPathFromUrl = ( url: string ): string => {
  const parts = url.split( '/' );
  parts.splice( 0, 3 );
  return '/' + parts.join( '/' );
};

export const signatureGeneration = ( {
  requestMethod,
  url,
  xRequestId,
  xSiteId,
  requestBody,
  siteSecretKey,
}: SignatureProps ) => {
  
  if (requestMethod === 'GET') {
    url = extractPathFromUrl( url );
    requestBody = '';
  }
  
  const signatureString = `${requestMethod}\n${url}\n${xSiteId}\n${xRequestId}\n${requestBody}`;
  return HmacSHA256( signatureString, siteSecretKey ).toString( enc.Hex );
}

export const headers = () => ( {
  'content-type': 'application/json',
} );

export const parseResponse = async( response: Response ) => {
  console.log('here ');
  switch (response.status) {
    case 200:
    case 201:
      const jsonData = await response.json();
      return jsonData || null;
    case 204:
      return {};
    case 400:
    case 403:
    case 409:
      const errorBody = await response.json();
      throw new Error(`HTTP Error: ${response.status} \n ${JSON.stringify(errorBody)}`);
    default:
      throw new Error((await response.json()).message || DEFAULT_ERROR_MESSAGE);
  }
};

