import { Button } from "react-native-elements"
import { styles } from "../styles"
import { ViewStyle } from "react-native"
import { useCreateAppointmentForm } from "../hooks/useCreateAppointmentForm"

export const CreateAppointmentActions: React.FC = () => {
    const {
        loading,
        handleCreateAppointment,
        navigation
    } = useCreateAppointmentForm();

    return (
        <>
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
        </>
    )
}