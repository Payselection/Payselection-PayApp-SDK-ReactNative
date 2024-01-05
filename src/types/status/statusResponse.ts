interface TransactionResult {
  TransactionState: string;
  TransactionId: string;
  OrderId: string;
}

export interface MultiStateTransactionInfo extends TransactionResult {
  StateDetails: {
    Amount: string;
    Currency: string;
    ProcessingAmount: string;
    PayoutToken?: string;
    ProcessingCurrency: string;
    RemainingAmount?: string;
    RebillId?: string;
    QrCodeString?: string;
  }
}

export interface TransactionStateDeclined extends TransactionResult {
  StateDetails: {
    Code: string;
    Description: string;
  }
}

export interface TransactionStateWaitFor3ds extends TransactionResult {
  StateDetails: {
    AcsUrl: string;
    PaReq: string;
    MD: string;
  }
}

export interface TransactionStateRedirect extends TransactionResult {
  StateDetails: {
    RedirectUrl?: string;
    RedirectMethod?: string;
    QrCodeString?: string;
  }
}

