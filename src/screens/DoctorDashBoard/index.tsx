import React from 'react';
import { ScrollView, TextStyle, ViewStyle } from 'react-native';
import { Button, Header, ListItem, Text } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { AppointmentCard, ButtonContainer, Container, EmptyText, LoadingText, SectionTitle, SpecialtyContainer, SpecialtyCount, SpecialtyItem, SpecialtyName, StatisticsGrid, StatusBadge, StatusText, styles, Title } from './styles';
import StatisticsCard from '../../components/StatisticsCard';
import { useDoctorDashBoard } from './hook/useDoctorDashBoard';
import theme from '../../styles/theme';
import AppointmentActionModal from '../../components/AppointmentActionModal';

const DoctorDashboardScreen: React.FC = () => {
    const { signOut } = useAuth();
    const {
        statistics,
        navigation,
        appointments,
        loading,
        modalVisible,
        selectedAppointment,
        actionType,
        handleOpenModal,
        handleCloseModal,
        handleConfirmAction,
        getStatusText,
    } = useDoctorDashBoard();

    return (
        <Container>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Title>Minhas Consultas</Title>

                <Button
                    title="Meu Perfil"
                    onPress={() => navigation.navigate('Profile')}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.buttonStyle}
                />

                <Button
                    title="Configurações"
                    onPress={() => navigation.navigate('Settings')}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.settingsButton}
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
                            subtitle={`${statistics.statusPercentages?.confirmed.toFixed(1)}% do total`}
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
                {statistics && Object.entries(statistics.specialties ?? {}).length > 0 && (
                    <SpecialtyContainer>
                        {Object.entries(statistics.specialties ?? {})
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

                {loading ? (
                    <LoadingText>Carregando consultas...</LoadingText>
                ) : appointments.length === 0 ? (
                    <EmptyText>Nenhuma consulta agendada</EmptyText>
                ) : (
                    appointments.map((appointment) => (
                        <AppointmentCard key={appointment.id}>
                            <ListItem.Content>
                                <ListItem.Title style={styles.patientName as TextStyle}>
                                    Paciente: {appointment.patientName || 'Nome não disponível'}
                                </ListItem.Title>
                                <ListItem.Subtitle style={styles.dateTime as TextStyle}>
                                    {appointment.date} às {appointment.time}
                                </ListItem.Subtitle>
                                <Text style={styles.specialty as TextStyle}>
                                    {appointment.specialty}
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
                                            onPress={() => handleOpenModal(appointment, 'confirm')}
                                            containerStyle={styles.actionButton as ViewStyle}
                                            buttonStyle={styles.confirmButton}
                                        />
                                        <Button
                                            title="Cancelar"
                                            onPress={() => handleOpenModal(appointment, 'cancel')}
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

                {selectedAppointment && (
                    <AppointmentActionModal
                        visible={modalVisible}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirmAction}
                        actionType={actionType}
                        appointmentDetails={{
                            patientName: selectedAppointment.patientName,
                            doctorName: selectedAppointment.doctorName,
                            date: selectedAppointment.date,
                            time: selectedAppointment.time,
                            specialty: selectedAppointment.specialty,
                        }}
                    />
                )}
            </ScrollView>
        </Container>
    );
};



export default DoctorDashboardScreen;