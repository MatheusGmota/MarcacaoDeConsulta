import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../interface/interface";

export class UserManagementService {
    static async handleStoredUsers(): Promise<User[]> {
        try {
            const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
            if(storedUsers) {
                return JSON.parse(storedUsers)
            }
            return [];
        } catch (e) {
            console.error("Erro ao carregar usuários:", e)
            return [];
        }
    }
    
    static async handleUpdatedUsers(updatedUsers: User[]): Promise<void> {
        try {
            await AsyncStorage.setItem('@MedicalApp:users', JSON.stringify(updatedUsers));
            console.log("Update de usuário realizada com sucesso!");
        } catch (e) {
            console.log("Não foi possível realizar a atualização dos usuários:", e)
        }
    }
}