import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import { PatientDashboardScreenProps } from "../type/type";
import { useState } from "react";
import { Appointment } from "../interface/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { PatientDashboardService } from "../service/PatientDashBoardService";

export const usePatientDashBoard = () => {
    const { user, signOut } = useAuth();
    const navigation = useNavigation<PatientDashboardScreenProps['navigation']>();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    const loadAppointments = async () => {
        try {
            const storedAppointments = await PatientDashboardService.handleStoredAppointments();
            if (storedAppointments) {
                const allAppointments: Appointment[] = storedAppointments;
                const userAppointments = allAppointments.filter(
                    (appointment) => appointment.patientId === user?.id
                );
                setAppointments(userAppointments);
            }
        } catch (error) {
            console.error('Erro ao carregar consultas:', error);
        } finally {
            setLoading(false);
        }
    };

    // Carrega as consultas quando a tela estiver em foco
    useFocusEffect(
        React.useCallback(() => {
            loadAppointments();
        }, [])
    );

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
        signOut,
        navigation,
        appointments,
        loading,
        getStatusText
    }
}