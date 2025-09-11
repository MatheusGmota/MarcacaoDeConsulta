import { ListItem, Text } from "react-native-elements"
import { AppointmentCard, EmptyText, LoadingText, StatusBadge, StatusText, styles } from "../styles"
import { TextStyle } from "react-native"
import { usePatientDashBoard } from "../hook/usePatientDashBoard"

export const AppointmentList: React.FC = () => {
    const {
        loading,
        appointments,
        getStatusText
    } = usePatientDashBoard();

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
                                Paciente: {appointment.patientName}
                            </ListItem.Title>
                            <ListItem.Subtitle style={styles.dateTime as TextStyle}>
                                {appointment.date} às {appointment.time}
                            </ListItem.Subtitle>
                            <Text style={styles.doctorName as TextStyle}>
                                {appointment.doctorName}
                            </Text>
                            <Text style={styles.specialty as TextStyle}>
                                {appointment.specialty}
                            </Text>
                            <StatusBadge status={appointment.status}>
                                <StatusText status={appointment.status}>
                                    {getStatusText(appointment.status)}
                                </StatusText>
                            </StatusBadge>
                        </ListItem.Content>
                    </AppointmentCard>
                ))
            )}
        </>
    )
}