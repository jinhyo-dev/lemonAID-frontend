export interface SignUpTypingProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dateOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  gender?: 'Male' | 'Female' | 'OtHer';
  nationality?: string;
  occupation?: string;
  visaCode?: string;
  videoMessenger?: string;
  videoMessengerId?: string;
  userType: 1 | 2 | undefined
}

export interface SignRequestProps {

}

export interface SignSelectStyleProps {
  $value: string;
}