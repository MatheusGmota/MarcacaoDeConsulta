import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment, Doctor } from '../models/Appointment';
import { notificationService } from '../../../services/notifications';

export class AppointmentService {
  private static readonly APPOINTMENTS_KEY = '@MedicalApp:appointments';

  static async createAppointment(
    date: string,
    selectedTime: string,
    selectedDoctor: Doctor,
    userId: string,
    userName: string
  ): Promise<Appointment> {
    try {
      // Recupera consultas existentes
      const storedAppointments = await AsyncStorage.getItem(this.APPOINTMENTS_KEY);
      const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

      // Cria nova consulta
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: userId,
        patientName: userName,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date,
        time: selectedTime,
        specialty: selectedDoctor.specialty,
        status: 'pending',
      };

      // Adiciona nova consulta à lista
      appointments.push(newAppointment);

      // Salva lista atualizada
      await AsyncStorage.setItem(this.APPOINTMENTS_KEY, JSON.stringify(appointments));

      // Envia notificação para o médico
      await notificationService.notifyNewAppointment(selectedDoctor.id, newAppointment);

      return newAppointment;
    } catch (error) {
      throw new Error('Erro ao agendar consulta. Tente novamente.');
    }
  }

  static async getAppointments(): Promise<Appointment[]> {
    try {
      const storedAppointments = await AsyncStorage.getItem(this.APPOINTMENTS_KEY);
      return storedAppointments ? JSON.parse(storedAppointments) : [];
    } catch (error) {
      throw new Error('Erro ao carregar consultas.');
    }
  }
}
