import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Container, ErrorText, styles, Title } from './styles';
import { useRegister } from './hook/useRegister';

const RegisterScreen: React.FC = () => {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        navigation,
        loading,
        error,
        handleRegister,
    } = useRegister();

    return (
        <Container>
            <Title>Cadastro de Paciente</Title>

            <Input
                placeholder="Nome completo"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                containerStyle={styles.input}
            />

            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                containerStyle={styles.input}
            />

            <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                containerStyle={styles.input}
            />

            {error ? <ErrorText>{error}</ErrorText> : null}

            <Button
                title="Cadastrar"
                onPress={handleRegister}
                loading={loading}
                containerStyle={styles.button as ViewStyle}
                buttonStyle={styles.buttonStyle}
            />

            <Button
                title="Voltar para Login"
                onPress={() => navigation.navigate('Login')}
                containerStyle={styles.backButton as ViewStyle}
                buttonStyle={styles.backButtonStyle}
            />
        </Container>
    );
};

export default RegisterScreen;  