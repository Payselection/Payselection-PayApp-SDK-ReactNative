import {
  AgentInfoType,
  PaymentMethodType,
  PaymentObjectFFD1_05, PaymentsType, TaxSystem,
  VatType,
} from '../commonTypes.ts';

export interface ReceiptFFD1_05 {
  client: ClientFFD1_05;
  company: CompanyFFD1_05;
  agent_info?: AgentInfoFFD1_05;
  supplier_info?: SupplierInfoFFD1_05;
  items: ItemsFFD1_05[];
  payments: PaymentsFFD1_05[];
  vats?: VatFFD1_05[];
  total: number;
  additional_check_props?: string;
  cashier?: string;
  additional_user_props?: AdditionalUserProps;
  
}

interface ClientFFD1_05 {
  name?: string;
  inn?: string;
  email?: string;
  phone?: string;
}

interface CompanyFFD1_05 {
  email?: string;
  sno?: TaxSystem;
  inn: string;
  payment_address: string;
}

interface AgentInfoFFD1_05 {
  type?: AgentInfoType,
  paying_agent?: PayingAgentFFD1_05;
  receive_payments_operator?: ReceivePaymentsOperatorFFD1_05;
  money_transfer_operator?: MoneyTransferOperatorFFD1_05;
}

interface PayingAgentFFD1_05 {
  operation?: string;
  phones?: string[];
}

interface ReceivePaymentsOperatorFFD1_05 {
  phones?: string[];
}

interface MoneyTransferOperatorFFD1_05 {
  phones?: string[];
  name?: string;
  address?: string;
  inn?: string;
}

interface SupplierInfoFFD1_05 {
  phones?: string[];
}

interface VatFFD1_05 {
  type: VatType;
  sum: number | null;
}

interface ItemsSupplierInfo {
  phones?: string[];
  name?: string;
  inn?: string;
}

interface ItemsFFD1_05 {
  name: string;
  price: number;
  quantity: number;
  sum: number | null;
  measurement_unit?: string;
  payment_method: PaymentMethodType;
  payment_object: PaymentObjectFFD1_05;
  nomenclature_code?: string;
  vat: VatFFD1_05;
  agent_info?: AgentInfoFFD1_05;
  supplier_info?: ItemsSupplierInfo;
  user_data?: string;
  excise?: number;
  country_code?: string;
  declaration_number?: string;
}

interface PaymentsFFD1_05 {
  type: PaymentsType;
  sum: number | null;
}

interface AdditionalUserProps {
  name: string;
  value: string;
}