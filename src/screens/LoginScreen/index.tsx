import React from 'react';
import { Container, Title } from './styles';
import LoginForm from './components/LoginForm';
import { useLoginScreen } from './hooks/useLoginScreen';
import CredentialsHint from './components/CredentialHint';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC = () => {

  const { email, password, setEmail, setPassword, loading, error, handleLogin } = useLoginScreen();
  const navigation = useNavigation<LoginScreenProps['navigation']>();

  return (
    <Container>
      <Title>Login</Title>

      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        error={error}
        onLogin={handleLogin}
        onNavigateRegister={() => navigation.navigate('Register')}
      />

      <CredentialsHint />
    </Container>
  );
};

export default LoginScreen;
