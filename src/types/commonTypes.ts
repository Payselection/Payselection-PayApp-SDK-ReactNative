export enum AgentInfoType {
  'bank_paying_agent',
  'bank_paying_subagent',
  'paying_agent',
  'paying_subagent',
  'attorney',
  'commission_agent',
  'another',
}

export enum PaymentMethodType {
  'full_prepayment',
  'prepayment',
  'advance',
  'full_payment',
  'partial_payment',
  'credit',
  'credit_payment',
}

export enum PaymentObjectFFD1_05 {
  'commodity',
  'excise',
  'job',
  'service',
  'gambling_bet',
  'gambling_prize',
  'lottery',
  'lottery_prize',
  'intellectual_activity',
  'payment',
  'agent_commission',
  'composite',
  'award',
  'another',
  'property_right',
  'non-operating_gain',
  'insurance_premium',
  'sales_tax',
  'resort_fee',
  'deposit',
  'expense',
  'pension_insurance_ip',
  'pension_insurance',
  'medical_insurance_ip',
  'medical_insurance',
  'social_insurance',
  'casino_payment',
}

export enum VatType {
  'none',
  'vat0',
  'vat10',
  'vat110',
  'vat20',
  'vat120',
}

export enum PaymentsType {
  'cash',
  'nonCash',
  'prepayment',
  'postPayment',
  'other',
}

export enum TaxSystem {
  'osn',
  'usn_income',
  'usn_income_outcome',
  'envd',
  'esn',
  'patent'
}

export enum PaymentObjectFFD1_2 {
  'regularGoods' = 1,
  'exciseGoods' ,
  'workPerformed' ,
  'serviceProvided',
  'bettingAcceptance',
  'bettingPayout',
  'lotteryTicketSales',
  'lotteryPayout',
  'intellectualPropertyUsage',
  'advancePayment',
  'userCommission',
  'penaltyPayment',
  'OtherTransactionType',
  'propertyRightsTransfer',
  'nonOperatingIncome',
  'taxDeductibleExpenses',
  'tradeFeePayment',
  'resortFee',
  'pawn',
  'expenseReduction',
  'pensionInsuranceIP',
  'pensionInsuranceOrg',
  'medicalInsuranceIP',
  'medicalInsuranceOrg',
  'socialInsurance',
  'casinoTransactions',
  'bankAgentCashDisbursement' = 27,
  'exciseGoodsUnmarked' = 30,
  'exciseGoodsMarked',
  'markedGoodsUnmarked',
  'markedGoodsMarked'
}