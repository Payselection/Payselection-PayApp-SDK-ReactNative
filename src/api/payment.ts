import {
  PublicPayHeader,
  PublicPayPayload,
} from '../types/payment/paymentPayload';
import {PayResponse} from '../types/payment/paymentResponse';
import {parseResponse} from '../utils/common';

const paymentApi = {
  async publicPay(
    payload: PublicPayPayload,
    header: PublicPayHeader,
  ): Promise<PayResponse> {
    const url = `https://pgw.payselection.com/payments/requests/public`;

    const headers = {
      'Content-Type': 'application/json',
      'X-SITE-ID': header.X_SITE_ID,
      'X-REQUEST-ID': header.X_REQUEST_ID,
    };

    const request = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, request);
    return await parseResponse(response);
  },
};
export default paymentApi;
