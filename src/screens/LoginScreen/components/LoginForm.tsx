import React from 'react';
import { Input, Button } from 'react-native-elements';
import { ErrorText } from '../styles';
import theme from '../../../styles/theme';


type Props = {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  loading: boolean;
  error: string;
  onLogin: () => void;
  onNavigateRegister: () => void;
};

const LoginForm: React.FC<Props> = ({ email, password, setEmail, setPassword, loading, error, onLogin, onNavigateRegister }) => {
  return (
    <>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={{ marginBottom: 15 }}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={{ marginBottom: 15 }}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Entrar"
        onPress={onLogin}
        loading={loading}
        containerStyle={{ marginTop: 10, width: '100%' }}
        buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
      />

      <Button
        title="Cadastrar Novo Paciente"
        onPress={onNavigateRegister}
        containerStyle={{ marginTop: 10, width: '100%' }}
        buttonStyle={{ backgroundColor: theme.colors.secondary, paddingVertical: 12 }}
      />
    </>
  );
};

export default LoginForm;
