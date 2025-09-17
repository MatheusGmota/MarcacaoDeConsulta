import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment } from "../interface/interface";

export class DoctorDashBoardService {
    static async handleLoadAppointments(): Promise<Appointment[]> {
        try {
            const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments')
            if (storedAppointments) {
                return JSON.parse(storedAppointments);
            }
            return [];
        } catch (e) {
            console.error('Erro ao carregar consultas', e);
            return [];
        }
    }

    static async handleSetUpdatedAppointments(updatedAppointments: Object[]): Promise<string> {
        try {
            await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(updatedAppointments));
            return "Consultas atualizadas";
        } catch(e) {
            console.error("Não foi possível atualizar as consultas!", e)
            return "Não foi possível atualizar as consultas!";
        }
    }
}