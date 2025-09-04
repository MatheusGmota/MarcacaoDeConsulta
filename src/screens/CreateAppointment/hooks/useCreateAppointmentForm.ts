import { useState } from 'react';
import { Doctor } from '../models/Appointment';

export const useCreateAppointmentForm = () => {
  // Estados do formulário
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Funções para atualizar estados
  const updateDate = (newDate: string) => {
    setDate(newDate);
    setError(''); // Limpa erro quando usuário digita
  };

  const updateSelectedTime = (time: string) => {
    setSelectedTime(time);
    setError(''); // Limpa erro quando usuário seleciona
  };

  const updateSelectedDoctor = (doctor: Doctor | null) => {
    setSelectedDoctor(doctor);
    setError(''); // Limpa erro quando usuário seleciona
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

  return {
    // Estados
    date,
    selectedTime,
    selectedDoctor,
    loading,
    error,
    
    // Funções
    updateDate,
    updateSelectedTime,
    updateSelectedDoctor,
    setLoadingState,
    setErrorMessage,
    clearError,
  };
};
