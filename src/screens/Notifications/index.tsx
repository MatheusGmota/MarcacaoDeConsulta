import React from 'react';
import { ScrollView, ViewStyle, } from 'react-native';
import { Button, ListItem, Badge } from 'react-native-elements';
import { Container, DateText, EmptyContainer, EmptyText, LoadingText, NotificationCard, NotificationHeader, NotificationIcon, styles, Title, TitleContainer, UnreadDot } from './styles';
import Header from '../../components/Header';
import { useNotifications } from './hook/useNotifications';

const NotificationsScreen: React.FC = () => {
    const {
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
    } = useNotifications();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TitleContainer>
          <Title>Notificações</Title>
          {unreadCount > 0 && (
            <Badge
              value={unreadCount}
              status="error"
              containerStyle={styles.badge}
            />
          )}
        </TitleContainer>

        {unreadCount > 0 && (
          <Button
            title="Marcar todas como lidas"
            onPress={handleMarkAllAsRead}
            containerStyle={styles.markAllButton as ViewStyle}
            buttonStyle={styles.markAllButtonStyle}
          />
        )}

        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

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
      </ScrollView>
    </Container>
  );
};

export default NotificationsScreen;