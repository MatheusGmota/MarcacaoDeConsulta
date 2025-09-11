import React from 'react';
import { ScrollView } from 'react-native';
import { Container, styles, Title } from './styles';
import Header from '../../components/Header';
import { useEditProfile } from './hook/useEditProfile';
import { ProfileSection } from './components/ProfileSection';
import { EditProfileActions } from './components/EditrProfileActions';


const EditProfileScreen: React.FC = () => {
    const {
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

                <EditProfileActions
                    loading={loading}
                    handleSaveProfile={handleSaveProfile}
                    navigation={navigation}
                />
            </ScrollView>
        </Container>
    );
};

export default EditProfileScreen;