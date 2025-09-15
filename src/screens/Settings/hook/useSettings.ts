import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import { SettingsScreenProps } from "../type/type";
import { useState } from "react";
import { AppSettings } from "../interface/interface";
import { storageService } from "../../../services/storage";
import React from "react";
import { Alert, Share } from "react-native";

export const useSettings = () => {
    const { signOut } = useAuth();
    const navigation = useNavigation<SettingsScreenProps['navigation']>();
    const [settings, setSettings] = useState<AppSettings>({
        notifications: true,
        autoBackup: true,
        theme: 'light',
        language: 'pt-BR',
    });
    const [loading, setLoading] = useState(true);
    const [storageInfo, setStorageInfo] = useState<any>(null);

    const loadSettings = async () => {
        try {
            const appSettings = await storageService.getAppSettings();
            setSettings(appSettings);

            const info = await storageService.getStorageInfo();
            setStorageInfo(info);
        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadSettings();
        }, [])
    );

    const updateSetting = async (key: keyof AppSettings, value: any) => {
        try {
            const updatedSettings = { ...settings, [key]: value };
            setSettings(updatedSettings);
            await storageService.updateAppSettings({ [key]: value });
        } catch (error) {
            console.error('Erro ao atualizar configuração:', error);
            Alert.alert('Erro', 'Não foi possível salvar a configuração');
        }
    };

    const handleCreateBackup = async () => {
        try {
            setLoading(true);
            const backup = await storageService.createBackup();

            const fileName = `backup_${new Date().toISOString().split('T')[0]}.json`;

            await Share.share({
                message: backup,
                title: `Backup do App - ${fileName}`,
            });

            Alert.alert('Sucesso', 'Backup criado e compartilhado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar backup:', error);
            Alert.alert('Erro', 'Não foi possível criar o backup');
        } finally {
            setLoading(false);
        }
    };

    const handleClearCache = async () => {
        Alert.alert(
            'Limpar Cache',
            'Isso irá limpar o cache da aplicação. Tem certeza?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Limpar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            storageService.clearCache();
                            await loadSettings();
                            Alert.alert('Sucesso', 'Cache limpo com sucesso!');
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível limpar o cache');
                        }
                    },
                },
            ]
        );
    };

    const handleClearAllData = async () => {
        Alert.alert(
            'Apagar Todos os Dados',
            'ATENÇÃO: Isso irá apagar TODOS os dados da aplicação permanentemente. Esta ação não pode ser desfeita!',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'APAGAR TUDO',
                    style: 'destructive',
                    onPress: async () => {
                        Alert.alert(
                            'Confirmação Final',
                            'Tem certeza absoluta? Todos os dados serão perdidos!',
                            [
                                { text: 'Cancelar', style: 'cancel' },
                                {
                                    text: 'SIM, APAGAR',
                                    style: 'destructive',
                                    onPress: async () => {
                                        try {
                                            await storageService.clearAll();
                                            Alert.alert('Concluído', 'Todos os dados foram apagados. O app será reiniciado.', [
                                                { text: 'OK', onPress: () => signOut() }
                                            ]);
                                        } catch (error) {
                                            Alert.alert('Erro', 'Não foi possível apagar os dados');
                                        }
                                    },
                                },
                            ]
                        );
                    },
                },
            ]
        );
    };

    return {
        navigation,
        settings,
        loading,
        storageInfo,
        updateSetting,
        handleCreateBackup,
        handleClearCache,
        handleClearAllData
    }
}