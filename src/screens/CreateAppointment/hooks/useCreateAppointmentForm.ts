import { useState } from 'react';
import { Doctor } from '../models/Appointment';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { AppointmentService } from '../services/appointmentService';

export const useCreateAppointmentForm = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateDate = (newDate: string) => {
    setDate(newDate);
    setError('');
  };

  const updateSelectedTime = (time: string) => {
    setSelectedTime(time);
    setError('');
  };

  const updateSelectedDoctor = (doctor: Doctor | null) => {
    setSelectedDoctor(doctor);
    setError('');
  };

  const setLoadingState = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const setErrorMessage = (message: string) => {
    setError(message);
  };

  const clearError = () => {
    setError('');
  };

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

  return {
    user,
    navigation,
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
    clearError,
    handleCreateAppointment,
  };
};
