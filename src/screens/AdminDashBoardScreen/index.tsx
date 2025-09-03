import { useAdminDashBoardScreen } from "./hooks/useAdminDashBoardScreen";
import { Container, styles, Title } from "./styles";
import { ScrollView, TextStyle, ViewStyle, Text } from "react-native";
import { Button, ListItem } from "react-native-elements";
import Header from "../../components/Header";
import StatisticsCard from "../../components/StatisticsCard";
import theme from "../../styles/theme";
import { AppointmentCard, ButtonContainer, EmptyText, LoadingText, SectionTitle, SpecialtyContainer, SpecialtyCount, SpecialtyItem, SpecialtyName, StatisticsGrid, StatusBadge, StatusText } from "../../styles/globalStyles";
import { getStatusText } from "../../utils/status";

export const AdminDashboardScreen: React.FC = () => {
  const { 
    user,
    signOut,
    navigation,
    statistics,
    appointments,
    users,
    loading,
    handleUpdateStatus
  } = useAdminDashBoardScreen();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Painel Administrativo</Title>

        <Button
          title="Gerenciar Usuários"
          onPress={() => navigation.navigate('UserManagement')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <SectionTitle>Estatísticas Gerais</SectionTitle>
        {statistics && (
          <StatisticsGrid>
            <StatisticsCard
              title="Total de Consultas"
              value={statistics.totalAppointments}
              color={theme.colors.primary}
              subtitle="Todas as consultas"
            />
            <StatisticsCard
              title="Consultas Confirmadas"
              value={statistics.confirmedAppointments}
              color={theme.colors.success}
              subtitle={`${statistics.statusPercentages.confirmed.toFixed(1)}% do total`}
            />
            <StatisticsCard
              title="Pacientes Ativos"
              value={statistics.totalPatients}
              color={theme.colors.secondary}
              subtitle="Pacientes únicos"
            />
            <StatisticsCard
              title="Médicos Ativos"
              value={statistics.totalDoctors}
              color={theme.colors.warning}
              subtitle="Médicos com consultas"
            />
          </StatisticsGrid>
        )}

        <SectionTitle>Especialidades Mais Procuradas</SectionTitle>
        {statistics && Object.entries(statistics.specialties).length > 0 && (
          <SpecialtyContainer>
            {Object.entries(statistics.specialties)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([specialty, count]) => (
                <SpecialtyItem key={specialty}>
                  <SpecialtyName>{specialty}</SpecialtyName>
                  <SpecialtyCount>{count} consultas</SpecialtyCount>
                </SpecialtyItem>
              ))
            }
          </SpecialtyContainer>
        )}

        <SectionTitle>Últimas Consultas</SectionTitle>
        {loading ? (
          <LoadingText>Carregando dados...</LoadingText>
        ) : appointments.length === 0 ? (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id}>
              <ListItem.Content>
                <ListItem.Title style={styles.doctorName as TextStyle}>
                  {appointment.doctorName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.specialty as TextStyle}>
                  {appointment.specialty}
                </ListItem.Subtitle>
                <Text style={styles.dateTime as TextStyle}>
                  {appointment.date} às {appointment.time}
                </Text>
                <StatusBadge status={appointment.status}>
                  <StatusText status={appointment.status}>
                    {getStatusText(appointment.status)}
                  </StatusText>
                </StatusBadge>
                {appointment.status === 'pending' && (
                  <ButtonContainer>
                    <Button
                      title="Confirmar"
                      onPress={() => handleUpdateStatus(appointment.id, 'confirmed')}
                      containerStyle={styles.actionButton as ViewStyle}
                      buttonStyle={styles.confirmButton}
                    />
                    <Button
                      title="Cancelar"
                      onPress={() => handleUpdateStatus(appointment.id, 'cancelled')}
                      containerStyle={styles.actionButton as ViewStyle}
                      buttonStyle={styles.cancelButton}
                    />
                  </ButtonContainer>
                )}
              </ListItem.Content>
            </AppointmentCard>
          ))
        )}

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};
