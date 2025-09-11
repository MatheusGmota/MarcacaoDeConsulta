import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Container, ErrorText, SectionTitle, styles, Title } from './styles';
import Header from '../../components/Header';
import TimeSlotList from '../../components/TimeSlotList';
import DoctorList from '../../components/DoctorList';
import { useAuth } from '../../contexts/AuthContext';
import { availableDoctors } from './models/availableDoctors';
import { useCreateAppointmentForm } from './hooks/useCreateAppointmentForm';
import { AppointmentService } from './services/appointmentService';
import { AppointmentInputs } from './components/AppointmentInputs';

const CreateAppointmentScreen: React.FC = () => {
  const {
    navigation,
    loading,
    error,
    handleCreateAppointment,
  } = useCreateAppointmentForm();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Agendar Consulta</Title>

        <AppointmentInputs />

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Button
          title="Agendar"
          onPress={handleCreateAppointment}
          loading={loading}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.cancelButton}
        />
      </ScrollView>
    </Container>
  );
};

export default CreateAppointmentScreen;