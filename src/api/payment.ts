import {
  PublicPayHeader,
  TokenBasedPayment,
  CryptogramPayment,
  QRCodePayment,
} from '../types/payment/paymentPayload.ts';
import { PayResponse } from '../types/payment/paymentResponse.ts';
import { parseResponse } from '../utils/common.ts';

const paymentApi = {
  async publicPay(payload: TokenBasedPayment | CryptogramPayment | QRCodePayment, header: PublicPayHeader): Promise<PayResponse> {
    const url = `https://gw.payselection.com/payments/requests/public`;
    
    const headers = {
      'Content-Type': 'application/json',
      'X-SITE-ID': header.X_SITE_ID,
      'X-REQUEST-ID': header.X_REQUEST_ID,
      'X-REQUEST-SIGNATURE': header.X_REQUEST_SIGNATURE,
    };
    
    const request = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    };
    
    const response = await fetch(url, request);
    return await parseResponse(response);
  },
}
export default paymentApi;
