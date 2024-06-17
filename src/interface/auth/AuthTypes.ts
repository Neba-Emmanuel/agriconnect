export interface EmailDataType {
  email: string;
}

export interface LoginDataType {
  email: string;
  password: string;
}

export interface VerifyDataType extends EmailDataType {
  verification_code: string;
}
export interface RegisterDataType {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface TranscriptDataType {
  fullName: string;
  level: string;
  date: string;
  type: string;
  // amount: string;
}

export interface PaymentDataType {
  amount: string;
  service: string;
  payer: string;
}
