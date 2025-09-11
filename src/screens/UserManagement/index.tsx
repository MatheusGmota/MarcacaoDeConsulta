import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, styles, Title } from './styles';
import Header from '../../components/Header';
import { useUserManagement } from './hook/useUserManagement';
import { UsersList } from './components/UsersList';


const UserManagementScreen: React.FC = () => {
    const {
        navigation,
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

                <UsersList />

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