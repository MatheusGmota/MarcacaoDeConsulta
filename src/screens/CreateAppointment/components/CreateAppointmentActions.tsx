import { Button } from "react-native-elements"
import { styles } from "../styles"
import { ViewStyle } from "react-native"
import { useCreateAppointmentForm } from "../hooks/useCreateAppointmentForm"

interface CreateAppointmentActionsProps {
    loading: boolean;
    handleCreateAppointment: () => Promise<void>;
    navigation: any;
}

export const CreateAppointmentActions: React.FC<CreateAppointmentActionsProps> = ({ 
    loading, 
    handleCreateAppointment, 
    navigation }) => {
        
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