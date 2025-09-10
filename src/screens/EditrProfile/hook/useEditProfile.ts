import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import { EditProfileScreenProps } from "../type/type";
import { useState } from "react";
import { imageService } from "../../../services/imageService";
import { Alert } from "react-native";
import { EditProfileService } from "../service/EditProfileService";
import { Doctor } from "../../../types";

export const useEditProfile = () => {
     const { user, updateUser } = useAuth();
    const navigation = useNavigation<EditProfileScreenProps['navigation']>();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [specialty, setSpecialty] = useState(user?.role === 'doctor' ? (user as Doctor).specialty : '');
    const [profileImage, setProfileImage] = useState(user?.image || '');
    const [loading, setLoading] = useState(false);

    const handleImageSelected = async (imageUri: string) => {
        try {
            setProfileImage(imageUri);

            // Salva a imagem no armazenamento local se for uma nova imagem
            if (imageUri.startsWith('data:image/') && user?.id) {
                const savedImageUri = await imageService.saveProfileImage(user.id, {
                    uri: imageUri,
                    base64: imageUri.split(',')[1],
                    width: 150,
                    height: 150,
                });
                setProfileImage(savedImageUri);
            }
        } catch (error) {
            console.error('Erro ao processar imagem:', error);
            Alert.alert('Erro', 'Não foi possível processar a imagem selecionada');
        }
    };

    const handleSaveProfile = async () => {
        try {
            setLoading(true);

            if (!name.trim() || !email.trim()) {
                Alert.alert('Erro', 'Nome e email são obrigatórios');
                return;
            }

            const updatedUser = {
                ...user!,
                name: name.trim(),
                email: email.trim(),
                image: profileImage,
                ...(user?.role === 'doctor' && { specialty: specialty.trim() }),
            };

            // Atualiza no Context
            await updateUser(updatedUser);

            // Salva no AsyncStorage
            await EditProfileService.updateProfile(updatedUser as Doctor);

            // Limpeza de imagens antigas
            if (user?.id) {
                await imageService.cleanupOldImages(user.id);
            }

            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o perfil');
            console.error('Erro ao atualizar perfil:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        name,
        setName,
        email,
        setEmail,
        specialty,
        setSpecialty,
        profileImage,
        setProfileImage,
        loading,
        handleImageSelected,
        handleSaveProfile,
        user,
        navigation,
        setLoading,
    }

}