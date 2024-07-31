import { ReceiptFFD1_05 } from "./receiptDataFFD1_05.ts";
import { ReceiptFFD1_2 } from "./receiptDataFFD1_2.ts";

export interface PublicPayHeader {
    X_SITE_ID: string;
    X_REQUEST_ID: string;
}

export interface PublicPayCustomerInfo {
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

export interface PublicPayExtraData {
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

export interface PublicPayReceiptData {
    timestamp: string;
    external_id?: string;
    receipt: ReceiptFFD1_05 | ReceiptFFD1_2;
}

export interface PublicPayPayloadBase {
    OrderId: string;
    Amount: string;
    Currency: string;
    Description: string;
    RebillFlag?: boolean;
    CustomerInfo: PublicPayCustomerInfo;
    ExtraData?: PublicPayExtraData;
    ReceiptData?: PublicPayReceiptData;
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

export interface PublicPayPaymentDetailsCryptogramRSA {
  Value: string;
}
export interface CryptogramPayment extends PublicPayPayloadBase {
    PaymentMethod: "Cryptogram";
    PaymentDetails: PublicPayPaymentDetailsCryptogram;
}

export interface TokenBasedPayment extends PublicPayPayloadBase {
    PaymentMethod: "Token";
    PaymentDetails: PublicPayPaymentDetailsToken;
}

export interface QRCodePayment extends PublicPayPayloadBase {
    PaymentMethod: "QR";
    PaymentDetails: PublicPayPaymentDetailsQR;
}

export interface ExternalFormPayment extends PublicPayPayloadBase {
    PaymentMethod: "ExternalForm";
}

export interface SberPayPayment extends PublicPayPayloadBase {
    PaymentMethod: "SberPay";
}

export interface CryptogramRSAPayment extends PublicPayPayloadBase {
  PaymentMethod: "CryptogramRSA";
  PaymentDetails: PublicPayPaymentDetailsCryptogramRSA;
  
}

export type PublicPayPayload =
    | CryptogramPayment
    | TokenBasedPayment
    | QRCodePayment
    | ExternalFormPayment
    | SberPayPayment
    | CryptogramRSAPayment;
