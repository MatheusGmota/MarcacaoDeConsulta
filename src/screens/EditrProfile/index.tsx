import React from 'react';
import { ScrollView, ViewStyle, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Container, ProfileCard, RoleBadge, RoleText, styles, Title } from './styles';
import { useAuth } from '../../contexts/AuthContext';
import ProfileImagePicker from '../../components/ProfileImagePicker';
import Header from '../../components/Header';
import { useEditProfile } from './hook/useEditProfile';


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

                <ProfileCard>
                    <ProfileImagePicker
                        currentImageUri={profileImage}
                        onImageSelected={handleImageSelected}
                        size={120}
                        editable={true}
                    />

                    <Input
                        label="Nome"
                        value={name}
                        onChangeText={setName}
                        containerStyle={styles.input}
                        placeholder="Digite seu nome"
                    />

                    <Input
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        containerStyle={styles.input}
                        placeholder="Digite seu email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {user?.role === 'doctor' && (
                        <Input
                            label="Especialidade"
                            value={specialty}
                            onChangeText={setSpecialty}
                            containerStyle={styles.input}
                            placeholder="Digite sua especialidade"
                        />
                    )}

                    <RoleBadge role={user?.role || ''}>
                        <RoleText>{user?.role === 'admin' ? 'Administrador' : user?.role === 'doctor' ? 'Médico' : 'Paciente'}</RoleText>
                    </RoleBadge>
                </ProfileCard>

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