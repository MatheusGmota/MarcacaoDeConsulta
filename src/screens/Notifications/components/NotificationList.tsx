import { ListItem } from "react-native-elements"
import { DateText, EmptyContainer, EmptyText, LoadingText, NotificationCard, NotificationHeader, NotificationIcon, styles, UnreadDot } from "../styles"
import { Notification } from "../../../services/notifications";

interface NotificationListProps {
    loading: any;
    notifications: Notification[];
    handleMarkAsRead: (notificationId: string) => Promise<void>;
    handleDeleteNotification: (notification: string) => Promise<void>;
    getNotificationIcon: (type: string) => "✅" | "❌" | "⏰" | "📩";
    formatDate: (dateTime: string) => string;
}

export const NotificationList: React.FC<NotificationListProps> = ({
    loading,
    notifications,
    handleMarkAsRead,
    handleDeleteNotification,
    getNotificationIcon,
    formatDate,
}) => {
    return (
        <>
            {loading ? (
                <LoadingText>Carregando notificações...</LoadingText>
            ) : notifications.length === 0 ? (
                <EmptyContainer>
                    <EmptyText>Nenhuma notificação encontrada</EmptyText>
                </EmptyContainer>
            ) : (
                notifications.map((notification) => (
                    <NotificationCard key={notification.id} isRead={notification.read}>
                        <ListItem
                            onPress={() => !notification.read && handleMarkAsRead(notification.id)}
                            onLongPress={() => handleDeleteNotification(notification.id)}
                        >
                            <NotificationIcon>{getNotificationIcon(notification.type)}</NotificationIcon>
                            <ListItem.Content>
                                <NotificationHeader>
                                    <ListItem.Title style={styles.title}>
                                        {notification.title}
                                    </ListItem.Title>
                                    {!notification.read && <UnreadDot />}
                                </NotificationHeader>
                                <ListItem.Subtitle style={styles.message}>
                                    {notification.message}
                                </ListItem.Subtitle>
                                <DateText>{formatDate(notification.createdAt)}</DateText>
                            </ListItem.Content>
                        </ListItem>
                    </NotificationCard>
                ))
            )}
        </>
    )
}