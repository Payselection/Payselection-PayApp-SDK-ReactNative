export interface PayResponse {
  TransactionId: string;
  OrderId: string;
  Amount: number;
  Currency: string;
  RedirectUrl: string;
  TransactionSecretKey: string;
}