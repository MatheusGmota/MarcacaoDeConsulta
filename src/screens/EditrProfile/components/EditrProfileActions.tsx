import { Button } from "react-native-elements";
import { styles } from "../styles";
import { ViewStyle } from "react-native";

interface EditProfileScreenProps {
    loading: boolean;
    handleSaveProfile: () => void;
    navigation: any;
}

export const EditProfileActions: React.FC<EditProfileScreenProps> = ({
    loading,
    handleSaveProfile,
    navigation,
}) => {

    return (
        <>
            <Button
                title="Salvar Alterações"
                onPress={handleSaveProfile}
                loading={loading}
                containerStyle={styles.button as ViewStyle}
                buttonStyle={styles.saveButton}
            />

            <Button
                title="Cancelar"
                onPress={() => navigation.goBack()}
                containerStyle={styles.button as ViewStyle}
                buttonStyle={styles.cancelButton}
            />
        </>
    );
}