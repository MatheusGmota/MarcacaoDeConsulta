
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

export interface StyledProps {
  role: string;
}