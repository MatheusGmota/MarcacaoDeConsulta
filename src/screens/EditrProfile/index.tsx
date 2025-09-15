import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, styles, Title } from './styles';
import Header from '../../components/Header';
import { useEditProfile } from './hook/useEditProfile';
import { ProfileSection } from './components/ProfileSection';


const EditProfileScreen: React.FC = () => {
    const {
        name,
        setName,
        email,
        setEmail,
        specialty,
        setSpecialty,
        profileImage,
        loading,
        handleImageSelected,
        handleSaveProfile,
        user,
        navigation,
    } = useEditProfile();

    return (
        <Container>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Title>Editar Perfil</Title>

                <ProfileSection
                    profileImage={profileImage}
                    handleImageSelected={handleImageSelected}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    specialty={specialty}
                    setSpecialty={setSpecialty}
                    user={user}
                />

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
            </ScrollView>
        </Container>
    );
};

export default EditProfileScreen;