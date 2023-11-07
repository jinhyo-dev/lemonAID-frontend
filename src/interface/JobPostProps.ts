export interface JobPostTypeProps {
  [key: string]: any;
  academy: string;
  campus: string;
  category: string;
  position: string;
  startSalary: number;
  endSalary: number;
  studentLevel: string;
  workingHoursStart: Date | undefined;
  workingHoursEnd: Date | undefined;
  paidVacation: number;
  annualLeave: number;
  severance: string;
  insurance: string;
  housing: string;
  housingAllowance: number;
}

export interface ImageListProps {
  [key: string]: { value: File | null, show: boolean };
  image1: { value: File | null, show: boolean };
  image2: { value: File | null, show: boolean };
  image3: { value: File | null, show: boolean };
  image4: { value: File | null, show: boolean };
}

export interface JobPostPayloadProps {
  position: string;
  salary: string;
}