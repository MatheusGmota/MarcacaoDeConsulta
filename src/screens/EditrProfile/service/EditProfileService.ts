import AsyncStorage from "@react-native-async-storage/async-storage";
import { Doctor } from "../../../types";

export class EditProfileService {
    static async updateProfile(updatedUser: Doctor): Promise<string> {
        try {
            await AsyncStorage.setItem('@MedicalApp:user', JSON.stringify(updatedUser));
            return 'Perfil atualizado com sucesso';
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
            return 'Não foi possível atualizar o perfil';
        }
    }
}