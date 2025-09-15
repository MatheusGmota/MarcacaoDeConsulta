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
import { CreateAppointmentActions } from './components/CreateAppointmentActions';

const CreateAppointmentScreen: React.FC = () => {
  const {
    navigation,
    date,
    selectedTime,
    selectedDoctor,
    loading,
    error,
    updateDate,
    updateSelectedTime,
    updateSelectedDoctor,
    handleCreateAppointment,
  } = useCreateAppointmentForm();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Agendar Consulta</Title>

        <AppointmentInputs
          date={date}
          updateDate={updateDate}
          updateSelectedTime={updateSelectedTime}
          selectedTime={selectedTime}
          updateSelectedDoctor={updateSelectedDoctor}
          selectedDoctor={selectedDoctor}
        />

        {error ? <ErrorText>{error}</ErrorText> : null}

        <CreateAppointmentActions
          loading={loading}
          handleCreateAppointment={handleCreateAppointment}
          navigation={navigation}
        />
      </ScrollView>
    </Container>
  );
};

export default CreateAppointmentScreen;