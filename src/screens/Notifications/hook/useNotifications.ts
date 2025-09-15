import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import { NotificationsScreenProps } from "../type/type";
import { useState } from "react";
import { notificationService, Notification } from "../../../services/notifications";
import React from "react";
import { Alert } from "react-native";

export const useNotifications = () => {
    const { user } = useAuth();
    const navigation = useNavigation<NotificationsScreenProps['navigation']>();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const loadNotifications = async () => {
        if (!user?.id) return;

        try {
            const userNotifications = await notificationService.getNotifications(user.id);
            setNotifications(userNotifications);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadNotifications();
        }, [user?.id])
    );

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            await notificationService.markAsRead(notificationId);
            loadNotifications();
        } catch (error) {
            console.error('Erro ao marcar como lida:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        if (!user?.id) return;

        try {
            await notificationService.markAllAsRead(user.id);
            loadNotifications();
        } catch (error) {
            console.error('Erro ao marcar todas como lidas:', error);
        }
    };

    const handleDeleteNotification = async (notificationId: string) => {
        Alert.alert(
            'Excluir Notificação',
            'Tem certeza que deseja excluir esta notificação?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await notificationService.deleteNotification(notificationId);
                            loadNotifications();
                        } catch (error) {
                            console.error('Erro ao excluir notificação:', error);
                        }
                    },
                },
            ]
        );
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'appointment_confirmed':
                return '✅';
            case 'appointment_cancelled':
                return '❌';
            case 'appointment_reminder':
                return '⏰';
            default:
                return '📩';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return {
        user,
        navigation,
        notifications,
        loading,
        handleMarkAsRead,
        handleMarkAllAsRead,
        handleDeleteNotification,
        getNotificationIcon,
        formatDate,
        unreadCount
    }

}