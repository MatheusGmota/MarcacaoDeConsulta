import React from 'react';
import { ScrollView, ViewStyle, } from 'react-native';
import { Button, Badge } from 'react-native-elements';
import { Container, styles, Title, TitleContainer } from './styles';
import Header from '../../components/Header';
import { useNotifications } from './hook/useNotifications';
import { NotificationList } from './components/NotificationList';

const NotificationsScreen: React.FC = () => {
  const {
    loading,
    notifications,
    handleMarkAsRead,
    handleDeleteNotification,
    getNotificationIcon,
    formatDate,
    navigation,
    handleMarkAllAsRead,
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

        <NotificationList
          loading={loading}
          notifications={notifications}
          handleMarkAsRead={handleMarkAsRead}
          handleDeleteNotification={handleDeleteNotification}
          getNotificationIcon={getNotificationIcon}
          formatDate={formatDate}
        />

      </ScrollView>
    </Container>
  );
};

export default NotificationsScreen;