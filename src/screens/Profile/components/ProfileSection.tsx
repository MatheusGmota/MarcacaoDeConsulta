import ProfileImagePicker from "../../../components/ProfileImagePicker";
import { User } from "../../../types/auth";
import { Email, Name, ProfileCard, RoleBadge, RoleText, SpecialtyText } from "../styles";

interface ProfileSectionProps {
    user: User | null;
    getRoleText: (role: string) => string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    user,
    getRoleText
}) => {

    return (
        <>
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

        </>
    );
}