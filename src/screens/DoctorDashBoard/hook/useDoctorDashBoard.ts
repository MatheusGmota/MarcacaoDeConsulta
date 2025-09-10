import { useFocusEffect, useNavigation } from "@react-navigation/native";
import theme from "../../../styles/theme";
import React, { useState } from "react";
import { notificationService } from "../../../services/notifications";
import { Appointment } from "../interface/interface";
import { Statistics, statisticsService } from "../../../services/statistics";
import { useAuth } from "../../../contexts/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DoctorDashboardScreenProps } from "../type/type";
import { DoctorDashBoardService } from "../service/DoctorDashBoardService";


export const useDoctorDashBoard = () => {
    const { user } = useAuth();
    const [statistics, setStatistics] = useState<Partial<Statistics> | null>(null);
    const navigation = useNavigation<DoctorDashboardScreenProps['navigation']>();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [actionType, setActionType] = useState<'confirm' | 'cancel'>('confirm');

    const loadAppointments = async () => {
        try {
            // Carrega estatísticas
            if (user) {
                const stats = await statisticsService.getDoctorStatistics(user.id);
                setStatistics(stats);
            }
            const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
            if (storedAppointments) {
                const allAppointments: Appointment[] = JSON.parse(storedAppointments);
                const doctorAppointments = allAppointments.filter(
                    (appointment) => appointment.doctorId === user?.id
                );
                setAppointments(doctorAppointments);
            }
        } catch (error) {
            console.error('Erro ao carregar consultas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (appointment: Appointment, action: 'confirm' | 'cancel') => {
        setSelectedAppointment(appointment);
        setActionType(action);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedAppointment(null);
    };

    const handleConfirmAction = async (reason?: string) => {
        if (!selectedAppointment) return;

        try {
            const storedAppointments = await DoctorDashBoardService.handleLoadAppointments();
            if (storedAppointments) {
                const allAppointments: Appointment[] = storedAppointments;
                const updatedAppointments = allAppointments.map(appointment => {
                    if (appointment.id === selectedAppointment.id) {
                        return {
                            ...appointment,
                            status: actionType === 'confirm' ? 'confirmed' : 'cancelled',
                            ...(reason && { cancelReason: reason })
                        };
                    }
                    return appointment;
                });
                await DoctorDashBoardService.handleSetUpdatedAppointments(updatedAppointments);

                // Envia notificação para o paciente
                if (actionType === 'confirm') {
                    await notificationService.notifyAppointmentConfirmed(
                        selectedAppointment.patientId,
                        selectedAppointment
                    );
                } else {
                    await notificationService.notifyAppointmentCancelled(
                        selectedAppointment.patientId,
                        selectedAppointment,
                        reason
                    );
                }

                loadAppointments(); // Recarrega a lista
            }
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
        }
    };

    // Carrega as consultas quando a tela estiver em foco
    useFocusEffect(
        React.useCallback(() => {
            loadAppointments();
        }, [])
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return theme.colors.success;
            case 'cancelled':
                return theme.colors.error;
            default:
                return theme.colors.warning;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'Confirmada';
            case 'cancelled':
                return 'Cancelada';
            default:
                return 'Pendente';
        }
    };

    return {
        statistics,
        navigation,
        appointments,
        loading,
        modalVisible,
        selectedAppointment,
        actionType,
        handleOpenModal,
        handleCloseModal,
        handleConfirmAction,
        getStatusColor,
        getStatusText,
    }
}