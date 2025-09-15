import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "appointment_confirmed" | "appointment_cancelled" | "appointment_reminder" | "general";
  read: boolean;
  createdAt: string;
  appointmentId?: string;
}

const STORAGE_KEY = "@MedicalApp:notifications";

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '5',
    title: 'Consulta Cancelada',
    message: 'Sua consulta com João Silva foi cancelada.',
    type: 'appointment_cancelled',
    read: false,
    createdAt: new Date().toISOString(),
    appointmentId: '3',
  },
  {
    id: '2',
    userId: '1',
    title: 'Lembrete de Consulta',
    message: `Você tem uma consulta agendada para amanhã às 15:30 com Felipe Seiki.`,
    type: 'appointment_reminder',
    read: false,
    createdAt: new Date().toISOString(),
    appointmentId: '7',
  },
  {
    id: '3',
    userId: '4',
    title: 'Lembrete de Consulta',
    message: `Você tem uma consulta agendada para amanhã às 15:30 com João Silva.`,
    type: 'appointment_reminder',
    read: false,
    createdAt: new Date().toISOString(),
    appointmentId: '7',
  },
  {
    id: '4',
    userId: '2',
    title: 'Nova Consulta Agendada',
    message: `Felipe Seiki agendou uma consulta para 05/11/2025 às 9:00.`,
    type: 'general',
    read: false,
    createdAt: new Date().toISOString(),
    appointmentId: '10',
  },
];

export const notificationService = {
  async getNotifications(userId: string): Promise<Notification[]> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      let allNotifications: Notification[] = stored ? JSON.parse(stored) : [];

      const missingMocks = mockNotifications.filter(
        (mock) => !allNotifications.some((n) => n.id === mock.id)
      );

      if (missingMocks.length > 0) {
        allNotifications = [...allNotifications, ...missingMocks];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allNotifications));
      }

      return allNotifications
        .filter((n) => n.userId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
      return [];
    }
  },

  async createNotification(notification: Omit<Notification, "id" | "createdAt" | "read">): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];

      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        read: false,
      };

      allNotifications.push(newNotification);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allNotifications));
    } catch (error) {
      console.error("Erro ao criar notificação:", error);
    }
  },

  async markAsRead(notificationId: string): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];

      const updatedNotifications = allNotifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  },

  async markAllAsRead(userId: string): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];

      const updatedNotifications = allNotifications.map((n) =>
        String(n.userId) === String(userId) ? { ...n, read: true } : n
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error("Erro ao marcar todas notificações como lidas:", error);
    }
  },

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];

      const filteredNotifications = allNotifications.filter((n) => n.id !== notificationId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotifications));
    } catch (error) {
      console.error("Erro ao deletar notificação:", error);
    }
  },

  async getUnreadCount(userId: string): Promise<number> {
    try {
      const notifications = await this.getNotifications(userId);
      return notifications.filter((n) => !n.read).length;
    } catch (error) {
      console.error("Erro ao contar notificações não lidas:", error);
      return 0;
    }
  },

  // 🔹 Helpers para criar notificações de eventos
  async notifyAppointmentConfirmed(patientId: string, appointmentDetails: any): Promise<void> {
    await this.createNotification({
      userId: patientId,
      type: "appointment_confirmed",
      title: "Consulta Confirmada",
      message: `Sua consulta com ${appointmentDetails.doctorName} foi confirmada para ${appointmentDetails.date} às ${appointmentDetails.time}.`,
      appointmentId: appointmentDetails.id,
    });
  },

  async notifyAppointmentCancelled(patientId: string, appointmentDetails: any, reason?: string): Promise<void> {
    await this.createNotification({
      userId: patientId,
      type: "appointment_cancelled",
      title: "Consulta Cancelada",
      message: `Sua consulta com ${appointmentDetails.doctorName} foi cancelada.${reason ? ` Motivo: ${reason}` : ""}`,
      appointmentId: appointmentDetails.id,
    });
  },

  async notifyNewAppointment(doctorId: string, appointmentDetails: any): Promise<void> {
    await this.createNotification({
      userId: doctorId,
      type: "general",
      title: "Nova Consulta Agendada",
      message: `${appointmentDetails.patientName} agendou uma consulta para ${appointmentDetails.date} às ${appointmentDetails.time}.`,
      appointmentId: appointmentDetails.id,
    });
  },

  async notifyAppointmentReminder(userId: string, appointmentDetails: any): Promise<void> {
    await this.createNotification({
      userId: userId,
      type: "appointment_reminder",
      title: "Lembrete de Consulta",
      message: `Você tem uma consulta agendada para amanhã às ${appointmentDetails.time} com ${appointmentDetails.doctorName || appointmentDetails.patientName}.`,
      appointmentId: appointmentDetails.id,
    });
  },
};
