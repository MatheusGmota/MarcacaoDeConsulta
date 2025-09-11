import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { Container, styles, Title } from './styles';
import { useDoctorDashBoard } from './hook/useDoctorDashBoard';
import AppointmentActionModal from '../../components/AppointmentActionModal';
import Header from '../../components/Header';
import AppointmentItem from './components/AppointmentItem';
import StatisticSection from './components/StatisticsSection';

const DoctorDashboardScreen: React.FC = () => {
    const { signOut } = useAuth();
    const {
        statistics,
        navigation,
        appointments,
        modalVisible,
        selectedAppointment,
        actionType,
        handleCloseModal,
        handleConfirmAction,
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

                <StatisticSection statistics={statistics}/>

                <AppointmentItem appointments={appointments}/>

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