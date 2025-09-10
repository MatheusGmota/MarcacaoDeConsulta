import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment } from "../interface/interface";


export class PatientDashboardService {
    static async handleStoredAppointments(): Promise<Appointment[]> {
        try{
            const appointments = await AsyncStorage.getItem('@MedicalApp:appointments')
            if(appointments) {
                return JSON.parse(appointments);
            }
            return [];
        } catch (e) {
            console.error("Não foi possível achar as consultas:", e)
            return [];
        }
    }
}