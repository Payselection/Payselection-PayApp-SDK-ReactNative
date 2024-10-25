import {
  GetStatusByOrderIdHeader,
  GetStatusByTransactionIdHeader,
} from '../types/status/statusPayload';
import {
  MultiStateTransactionInfo,
  TransactionStateDeclined,
  TransactionStateRedirect,
  TransactionStateWaitFor3ds,
} from '../types/status/statusResponse';
import {parseResponse} from '../utils/common';

const getStatusApi = {
  async getStatusByTransactionId(
    transactionId: string,
    header: GetStatusByTransactionIdHeader,
  ): Promise<
    | MultiStateTransactionInfo
    | TransactionStateDeclined
    | TransactionStateWaitFor3ds
    | TransactionStateRedirect
  > {
    const url = `https://pgw.payselection.com/transactions/${transactionId}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-SITE-ID': header.X_SITE_ID,
      'X-REQUEST-ID': header.X_REQUEST_ID,
      'X-REQUEST-SIGNATURE': header.X_REQUEST_SIGNATURE,
      'X-REQUEST-AUTH': 'public',
    };

    const request = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(url, request);
    return await parseResponse(response);
  },

  async getStatusByOrderId(
    orderId: string,
    header: GetStatusByOrderIdHeader,
  ): Promise<
    | MultiStateTransactionInfo
    | TransactionStateDeclined
    | TransactionStateWaitFor3ds
    | TransactionStateRedirect
  > {
    const url = `https://gw.payselection.com/orders/${orderId}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-SITE-ID': header.X_SITE_ID,
      'X-REQUEST-ID': header.X_REQUEST_ID,
      'X-REQUEST-SIGNATURE': header.X_REQUEST_SIGNATURE,
    };

    const request = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(url, request);
    return await parseResponse(response);
  },
};
export default getStatusApi;
