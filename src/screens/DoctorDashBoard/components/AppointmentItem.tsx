import React from 'react';
import { Button, ListItem, Text } from 'react-native-elements';
import { AppointmentCard, ButtonContainer, EmptyText, LoadingText, StatusBadge, StatusText, styles } from '../styles';
import { TextStyle, ViewStyle } from 'react-native';
import { Appointment } from '../interface/interface';
import { useDoctorDashBoard } from '../hook/useDoctorDashBoard';

interface AppointmentItemProps {
    appointments: Appointment[]
};

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointments }) => {
    const {
        loading,
        getStatusText,
        handleOpenModal
    } = useDoctorDashBoard();

    return (
        <>
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
        </>
    );
};

export default AppointmentItem;  