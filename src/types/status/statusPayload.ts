export interface GetStatusByTransactionIdHeader {
  X_SITE_ID: string;
  X_REQUEST_ID: string;
  X_REQUEST_SIGNATURE: string;
  X_REQUEST_AUTH?: string;
}

export interface GetStatusByOrderIdHeader {
  X_SITE_ID: string;
  X_REQUEST_ID: string;
  X_REQUEST_SIGNATURE: string;
}
