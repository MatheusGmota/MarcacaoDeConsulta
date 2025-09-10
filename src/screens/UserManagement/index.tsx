import React from 'react';
import { ScrollView, TextStyle, ViewStyle } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { ButtonContainer, Container, EmptyText, LoadingText, RoleBadge, RoleText, styles, Title, UserCard } from './styles';
import Header from '../../components/Header';
import { useUserManagement } from './hook/useUserManagement';


const UserManagementScreen: React.FC = () => {
    const {
        navigation,
        users,
        loading,
        handleDeleteUser,
        getRoleText
    } = useUserManagement();

    return (
        <Container>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Title>Gerenciar Usuários</Title>

                <Button
                    title="Adicionar Novo Usuário"
                    onPress={() => { }}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.buttonStyle}
                />

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

                <Button
                    title="Voltar"
                    onPress={() => navigation.goBack()}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.backButton}
                />
            </ScrollView>
        </Container>
    );
};

export default UserManagementScreen; 