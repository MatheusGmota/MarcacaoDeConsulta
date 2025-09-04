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

const CreateAppointmentScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  
  // Hook para gerenciar o formulário
  const {
    date,
    selectedTime,
    selectedDoctor,
    loading,
    error,
    updateDate,
    updateSelectedTime,
    updateSelectedDoctor,
    setLoadingState,
    setErrorMessage,
  } = useCreateAppointmentForm();

  const handleCreateAppointment = async () => {
    try {
      setLoadingState(true);
      setErrorMessage('');

      if (!date || !selectedTime || !selectedDoctor) {
        setErrorMessage('Por favor, preencha a data e selecione um médico e horário');
        return;
      }

      // Usa o service para criar a consulta
      await AppointmentService.createAppointment(
        date,
        selectedTime,
        selectedDoctor,
        user?.id || '',
        user?.name || ''
      );

      alert('Consulta agendada com sucesso!');
      navigation.goBack();
    } catch (err) {
      setErrorMessage('Erro ao agendar consulta. Tente novamente.');
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Agendar Consulta</Title>

        <Input
          placeholder="Data (DD/MM/AAAA)"
          value={date}
          onChangeText={updateDate}
          containerStyle={styles.input}
          keyboardType="numeric"
        />

        <SectionTitle>Selecione um Horário</SectionTitle>
        <TimeSlotList
          onSelectTime={updateSelectedTime}
          selectedTime={selectedTime}
        />

        <SectionTitle>Selecione um Médico</SectionTitle>
        <DoctorList
          doctors={availableDoctors}
          onSelectDoctor={updateSelectedDoctor}
          selectedDoctorId={selectedDoctor?.id}
        />

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