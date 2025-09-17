import { Input } from "react-native-elements";
import { ProfileCard, RoleBadge, RoleText, styles } from "../styles";
import ProfileImagePicker from "../../../components/ProfileImagePicker";

interface ProfileSectionProps {
    profileImage: string | undefined;
    handleImageSelected: (uri: string) => void;
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    specialty: string;
    setSpecialty: (specialty: string) => void;
    user: {
        role: 'admin' | 'doctor' | 'patient' | null;
    } | null;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    profileImage,
    handleImageSelected,
    name,
    setName,
    email,
    setEmail,
    specialty,
    setSpecialty,
    user,
}) => {

    return (
        <>
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
        </>
    );
} 