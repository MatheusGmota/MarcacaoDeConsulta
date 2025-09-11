import { Input } from "react-native-elements"
import { useCreateAppointmentForm } from "../hooks/useCreateAppointmentForm"
import { availableDoctors } from "../models/availableDoctors";
import { SectionTitle, styles } from "../styles";
import TimeSlotList from "../../../components/TimeSlotList";
import DoctorList from "../../../components/DoctorList";
import { Doctor } from "../../../types";

interface AppointmentInputsProps {
    date: string;
    updateDate: (newDate: string) => void;
    updateSelectedTime: (time: string) => void;
    selectedTime: string;
    updateSelectedDoctor: (doctor: Doctor | null) => void;
    selectedDoctor: Doctor | null;
}

export const AppointmentInputs: React.FC<AppointmentInputsProps> = ({
    date,
    updateDate,
    updateSelectedTime,
    selectedTime,
    updateSelectedDoctor,
    selectedDoctor }) => {

    return (
        <>
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
        </>
    )
}