import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { User } from "../interface/interface";
import { UserManagementScreenProps } from "../type/type";
import { useAuth } from "../../../contexts/AuthContext";
import { UserManagementService } from "../service/UserManagementService";

export const useUserManagement = () => {
    const { user } = useAuth();
    const navigation = useNavigation<UserManagementScreenProps['navigation']>();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            const storedUsers = await UserManagementService.handleStoredUsers();
            if (storedUsers) {
                const allUsers: User[] = storedUsers;
                // Filtra o usuário atual da lista
                console.log("Usuarios carregados")
                const filteredUsers = allUsers.filter(u => u.id !== user?.id);
                setUsers(filteredUsers);
            }
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            const storedUsers = await UserManagementService.handleStoredUsers();
            if (storedUsers) {
                const allUsers: User[] = storedUsers;
                const updatedUsers = allUsers.filter(u => u.id !== userId);
                await UserManagementService.handleUpdatedUsers(updatedUsers);
                loadUsers(); // Recarrega a lista
            }
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    // Carrega os usuários quando a tela estiver em foco
    useFocusEffect(
        React.useCallback(() => {
            loadUsers();
        }, [])
    );

    const getRoleText = (role: string) => {
        switch (role) {
            case 'admin':
                return 'Administrador';
            case 'doctor':
                return 'Médico';
            case 'patient':
                return 'Paciente';
            default:
                return role;
        }
    };

    return {
        user,
        navigation,
        users,
        loading,
        handleDeleteUser,
        getRoleText
    }
}