import { useNavigation } from "@react-navigation/native";
import { AdminDashboardScreenProps } from "./types/typeAdminDashBoardScreen";
import { useAdminDashBoardScreen } from "./hooks/useAdminDashBoardScreen";
import { Container, styles, Title } from "./styles";
import { ScrollView, ViewStyle } from "react-native";
import { Button } from "react-native-elements";
import Header from "../../components/Header";

const AdminDashboardScreen: React.FC = () => {
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

  const loadData = async () => {
    try {
      // Carrega estatísticas
      const stats = await statisticsService.getGeneralStatistics();
      setStatistics(stats);
      // Carrega consultas
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        setAppointments(allAppointments);
      }

      // Carrega usuários
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        setUsers(allUsers);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados quando a tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleUpdateStatus = async (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment => {
          if (appointment.id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(updatedAppointments));
        loadData(); // Recarrega os dados
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

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
