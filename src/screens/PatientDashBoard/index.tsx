import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, styles, Title } from './styles';
import Header from '../../components/Header';
import { usePatientDashBoard } from './hook/usePatientDashBoard';
import { ButtonSection } from './components/ButtonSection';
import { AppointmentList } from './components/AppointmentList';

const PatientDashboardScreen: React.FC = () => {
    const {
        signOut,
    } = usePatientDashBoard();

    return (
        <Container>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Title>Minhas Consultas</Title>

                <ButtonSection />

                <AppointmentList />

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

export default PatientDashboardScreen; 