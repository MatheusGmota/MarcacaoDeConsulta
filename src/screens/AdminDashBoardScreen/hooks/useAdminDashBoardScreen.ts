import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Statistics, statisticsService } from "../../../services/statistics";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AdminDashboardScreenProps } from "../types/typeAdminDashBoardScreen";
import { Appointment, User } from "../interfaces/interfaceAdminDashBoardScreen";

export const useAdminDashBoardScreen = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<AdminDashboardScreenProps["navigation"]>();
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      // Carrega estatísticas
      const stats = await statisticsService.getGeneralStatistics();
      setStatistics(stats);
      // Carrega consultas
      const storedAppointments = await AsyncStorage.getItem(
        "@MedicalApp:appointments"
      );
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        setAppointments(allAppointments);
      }

      // Carrega usuários
      const storedUsers = await AsyncStorage.getItem("@MedicalApp:users");
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        setUsers(allUsers);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados quando a tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleUpdateStatus = async (
    appointmentId: string,
    newStatus: "confirmed" | "cancelled"
  ) => {
    try {
      const storedAppointments = await AsyncStorage.getItem(
        "@MedicalApp:appointments"
      );
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map((appointment) => {
          if (appointment.id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        await AsyncStorage.setItem(
          "@MedicalApp:appointments",
          JSON.stringify(updatedAppointments)
        );
        loadData(); // Recarrega os dados
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return {
    user,
    signOut,
    navigation,
    statistics,
    appointments,
    users,
    loading,
    handleUpdateStatus
  };
};
