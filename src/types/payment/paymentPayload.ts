import { ReceiptFFD1_05 } from './receiptDataFFD1_05.ts';
import { ReceiptFFD1_2 } from './receiptDataFFD1_2.ts';

export interface PublicPayHeader {
  X_SITE_ID: string;
  X_REQUEST_ID: string;
  X_REQUEST_SIGNATURE: string;
}

export interface PublicPayPayload {
  OrderId: string;
  Amount: string;
  Currency: string;
  Description: string;
  RebillFlag?: boolean;
  CustomerInfo: PublicPayCustomerInfo;
  ExtraData?: PublicPayExtraData;
  PaymentMethod: string;
  ReceiptData?: PublicPayReceiptData;
}

export interface CryptogramPayment extends PublicPayPayload {
  PaymentDetails: PublicPayPaymentDetailsCryptogram;
}

export interface TokenBasedPayment extends PublicPayPayload {
  PaymentDetails: PublicPayPaymentDetailsToken;
}

export interface QRCodePayment extends PublicPayPayload {
  PaymentDetails: PublicPayPaymentDetailsQR;
}

interface PublicPayExtraData {
  ReturnUrl?: string;
  WebhookUrl?: string;
  ScreenHeight?: string;
  ScreenWidth?: string;
  ChallengeWindowSize?: string;
  TimeZoneOffset?: string;
  ColorDepth?: string;
  Region?: string;
  UserAgent?: string;
  acceptHeader?: string;
  JavaEnabled?: boolean;
  javaScriptEnabled?: boolean;
}

interface PublicPayCustomerInfo {
  Email?: string;
  ReceiptEmail?: string;
  IsSendReceipt?: boolean;
  Phone?: string;
  Language?: string;
  Address?: string;
  Town?: string;
  ZIP?: string;
  Country?: string;
  IP: string;
}

interface PublicPayReceiptData {
  timestamp: string;
  external_id?: string;
  receipt: ReceiptFFD1_05 | ReceiptFFD1_2;
}

export interface PublicPayPaymentDetailsCryptogram {
  Value: string;
}

export interface PublicPayPaymentDetailsToken {
  Type: string;
  PayToken: string;
}

export interface PublicPayPaymentDetailsQR {
  timestamp: string;
  external_id?: string;
  receipt: ReceiptFFD1_05;
}
