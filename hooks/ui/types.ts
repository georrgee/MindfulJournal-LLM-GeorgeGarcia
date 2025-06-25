export interface ValidationRules {
  email?:           boolean;
  password?:        boolean;
  confirmPassword?: boolean;
};

export interface ValidationFormErrors  {
  [key: string]: string; 
};