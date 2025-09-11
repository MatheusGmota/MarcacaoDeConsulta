import { Button } from "react-native-elements"
import { usePatientDashBoard } from "../hook/usePatientDashBoard"
import { styles } from "../styles";
import { ViewStyle } from "react-native";

export const ButtonSection: React.FC = () => {
    const {
        navigation
    } = usePatientDashBoard();

    return (
        <>
            <Button
                title="Agendar Nova Consulta"
                onPress={() => navigation.navigate('CreateAppointment')}
                containerStyle={styles.button as ViewStyle}
                buttonStyle={styles.buttonStyle}
            />

            <Button
                title="Meu Perfil"
                onPress={() => navigation.navigate('Profile')}
                containerStyle={styles.button as ViewStyle}
                buttonStyle={styles.buttonStyle}
            />

            <Button
                title="Configurações"
                onPress={() => navigation.navigate('Settings')}
                containerStyle={styles.button as ViewStyle}
                buttonStyle={styles.settingsButton}
            />
        </>
    )
}