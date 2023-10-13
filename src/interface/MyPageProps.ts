export interface MyPageProps {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birthday: string;
  gender?: 'Male' | 'Female' | 'OtHer';
  nationality: string;
  visa_code: string;
  occupation: string;
  manners: number;
  amateur: number;
  video_messenger: string;
  video_messenger_id: string;
  resume: string;
  image_path: string;
  plan: number;
  is_admin: number;
}