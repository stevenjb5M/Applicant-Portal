export interface Application {
  id: string;
  position: string;
  company: string;
  description: string;
  requirements: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview';
  appliedDate: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  coverLetter: string;
  resumeUrl?: string;
  notes?: string;
}

export interface CreateApplicationRequest {
  position: string;
  company: string;
  description: string;
  requirements: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  coverLetter: string;
  resumeUrl?: string;
}
