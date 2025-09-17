export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface CreateAppointmentData {
  date: string;
  time: string;
  doctorId: string;
  patientId: string;
  patientName: string;
}

export interface AppointmentFormState {
  date: string;
  selectedTime: string;
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string;
}
