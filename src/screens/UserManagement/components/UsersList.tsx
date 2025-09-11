import { Button, ListItem } from "react-native-elements"
import { ButtonContainer, EmptyText, LoadingText, RoleBadge, RoleText, styles, UserCard } from "../styles"
import { useUserManagement } from "../hook/useUserManagement"
import { TextStyle, ViewStyle } from "react-native";

export const UsersList: React.FC = () => {
    const {
        loading,
        users,
        getRoleText,
        handleDeleteUser
    } = useUserManagement();

    return (
        <>
            {loading ? (
                <LoadingText>Carregando usuários...</LoadingText>
            ) : users.length === 0 ? (
                <EmptyText>Nenhum usuário cadastrado</EmptyText>
            ) : (
                users.map((user) => (
                    <UserCard key={user.id}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.userName as TextStyle}>
                                {user.name}
                            </ListItem.Title>
                            <ListItem.Subtitle style={styles.userEmail as TextStyle}>
                                {user.email}
                            </ListItem.Subtitle>
                            <RoleBadge role={user.role}>
                                <RoleText role={user.role}>
                                    {getRoleText(user.role)}
                                </RoleText>
                            </RoleBadge>
                            <ButtonContainer>
                                <Button
                                    title="Editar"
                                    onPress={() => { }}
                                    containerStyle={styles.actionButton as ViewStyle}
                                    buttonStyle={styles.editButton}
                                />
                                <Button
                                    title="Excluir"
                                    onPress={() => handleDeleteUser(user.id)}
                                    containerStyle={styles.actionButton as ViewStyle}
                                    buttonStyle={styles.deleteButton}
                                />
                            </ButtonContainer>
                        </ListItem.Content>
                    </UserCard>
                ))
            )}
        </>
    )
}