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

const processServerError = async (response: Response) => {
  const data = await response.json();
  if (!data || typeof data !== 'object' || !data.error) {
    return new Error(DEFAULT_ERROR_MESSAGE);
  }
  return new Error(data.error.message || DEFAULT_ERROR_MESSAGE);
};

interface ErrorResponse {
  message: string;
}

const processClientError = async (response: Response): Promise<string> => {
  const data: { errors?: ErrorResponse[] } = await response.json();
  let errorMessage = '';
  if (data.errors && Array.isArray(data.errors)) {
    errorMessage = data.errors.map((err: ErrorResponse) => err.message).join('; ');
  }
  return errorMessage || DEFAULT_ERROR_MESSAGE;
};

export const parseResponse = async( response: Response ) => {
  switch (response.status) {
    case 200:
    case 201:
      const jsonData = await response.json();
      return jsonData || null;
    case 204:
      return {};
    case 400:
    case 403:
    case 404:
      throw new Error(await processClientError(response));
    case 500:
      throw await processServerError(response);
    default:
      throw new Error((await response.json()).message || DEFAULT_ERROR_MESSAGE);
  }
};

