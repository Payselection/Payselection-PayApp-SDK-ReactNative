import {
  AgentInfoType,
  PaymentMethodType,
  PaymentObjectFFD1_2,
  PaymentsType,
  TaxSystem,
  VatType,
} from '../commonTypes.ts';

export interface ReceiptFFD1_2 {
  client: ClientFFD1_2;
  company: CompanyFFD1_2;
  items: ItemsFFD1_2[];
  payments: PaymentsFFD1_2[];
  vats?: VatsFFD1_2[];
  total: number;
  additional_check_props?: string;
  cashier?: string;
  additional_user_props?: AdditionalUserPropsFFD1_2;
  operating_check_props?: OperatingCheckPropsFFD1_2;
  sectoral_check_props?: SectoralCheckPropsFFD1_2[];
}

interface ClientFFD1_2 {
  name?: string;
  inn?: string;
  email?: string;
  phone?: string;
}

interface CompanyFFD1_2 {
  email?: string;
  sno: TaxSystem;
  inn: string;
  paymentAddress: string;
}

interface ItemsFFD1_2 {
  name: string;
  price: number;
  quantity: number;
  sum: number | null;
  measure: number;
  payment_method: PaymentMethodType;
  payment_object: PaymentObjectFFD1_2;
  vat: VatFFD1_2;
  agent_info?: AgentInfoFFD1_2;
  supplier_info?: SupplierInfoFFD1_2;
  user_data?: string;
  excise?: number;
  country_code?: string;
  declaration_number?: string;
  mark_quantity?: MarkQuantityFFD1_2;
  mark_processing_mode?: string;
  sectoral_item_props?: SectoralItemPropsFFD1_2[];
  mark_code?: MarkCodeFFD1_2;
}

interface VatFFD1_2 {
  type: VatType;
  sum?: number | null;
}

interface SupplierInfoFFD1_2 {
  phones: string[];
  name?: string;
  inn?: string;
}

interface MarkQuantityFFD1_2 {
  numerator: number;
  denominator: number;
}

interface SectoralItemPropsFFD1_2 {
  federal_id: string;
  date: string;
  number: string;
  value: string;
}

interface MarkCodeFFD1_2 {
  unknown?: string;
  ean?: string;
  ean13?: string;
  itf14?: string;
  gs10?: string;
  gs1m?: string;
  short?: string;
  fur?: string;
  egais20?: string;
  egais30?: string;
}

interface AgentInfoFFD1_2 {
  type?: AgentInfoType;
  paying_agent?: PayingAgentFFD1_2;
  receive_payments_operator?: ReceivePaymentsOperatorFFD1_2;
  money_transfer_operator?: MoneyTransferOperatorFFD1_2;
}

interface PayingAgentFFD1_2 {
  operation?: string;
  phones?: string[];
}

interface ReceivePaymentsOperatorFFD1_2 {
  phones?: string[];
}

interface MoneyTransferOperatorFFD1_2 {
  phones?: string[];
  name?: string;
  address?: string;
  inn?: string;
}

interface PaymentsFFD1_2 {
  type: PaymentsType;
  sum: number | null;
}

interface VatsFFD1_2 {
  type: VatType;
  sum?: number | null;
}

interface AdditionalUserPropsFFD1_2 {
  name: string;
  value: string;
}

interface OperatingCheckPropsFFD1_2 {
  name: string;
  value: string;
  timestamp: string;
}

interface SectoralCheckPropsFFD1_2 {
  federal_id: string;
  date: string;
  number: string;
  value: string;
}
