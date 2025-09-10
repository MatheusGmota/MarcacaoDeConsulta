import React from 'react';
import { Button, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, ViewStyle } from 'react-native';
import { Container, Email, Name, ProfileCard, RoleBadge, RoleText, SpecialtyText, styles, Title } from './styles';
import Header from '../../components/Header';
import ProfileImagePicker from '../../components/ProfileImagePicker';
import { useProfile } from './hook/useProfile';

const ProfileScreen: React.FC = () => {
    const {
        user,
        signOut,
        navigation,
        getRoleText,
    } = useProfile();

    return (
        <Container>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Title>Meu Perfil</Title>

                <ProfileCard>
                    <ProfileImagePicker
                        currentImageUri={user?.image}
                        onImageSelected={() => { }} // Read-only na tela de perfil
                        size={120}
                        editable={false}
                    />
                    <Name>{user?.name}</Name>
                    <Email>{user?.email}</Email>
                    <RoleBadge role={user?.role || ''}>
                        <RoleText>{getRoleText(user?.role || '')}</RoleText>
                    </RoleBadge>

                    {user?.role === 'doctor' && (
                        <SpecialtyText>Especialidade: {user?.specialty}</SpecialtyText>
                    )}
                </ProfileCard>

                <Button
                    title="Editar Perfil"
                    onPress={() => navigation.navigate('EditProfile' as any)}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.editButton}
                />

                <Button
                    title="Voltar"
                    onPress={() => navigation.goBack()}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.buttonStyle}
                />

                <Button
                    title="Sair"
                    onPress={signOut}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.logoutButton}
                />
            </ScrollView>
        </Container>
    );
};

export default ProfileScreen;