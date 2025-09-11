import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { useSettings } from './hook/useSettings';
import { Container, LoadingContainer, LoadingText, SectionTitle, styles, Title } from './styles';
import Header from '../../components/Header';
import { PreferenceSection } from './components/PreferenceSection';
import { CacheSection } from './components/CacheSection';


const SettingsScreen: React.FC = () => {
    const {
        navigation,
        loading,
        storageInfo,
        handleCreateBackup,
        handleClearCache,
        handleClearAllData
    } = useSettings();

    if (loading) {
        return (
            <Container>
                <Header />
                <LoadingContainer>
                    <LoadingText>Carregando configurações...</LoadingText>
                </LoadingContainer>
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Title>Configurações</Title>

                <PreferenceSection />

                <CacheSection storageInfo={storageInfo} />

                <Button
                    title="Criar Backup"
                    onPress={handleCreateBackup}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.backupButton}
                    loading={loading}
                />

                <Button
                    title="Limpar Cache"
                    onPress={handleClearCache}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.cacheButton}
                />

                <SectionTitle>Ações Perigosas</SectionTitle>
                <Button
                    title="Apagar Todos os Dados"
                    onPress={handleClearAllData}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.dangerButton}
                />

                <Button
                    title="Voltar"
                    onPress={() => navigation.goBack()}
                    containerStyle={styles.button as ViewStyle}
                    buttonStyle={styles.buttonStyle}
                />
            </ScrollView>
        </Container>
    );
};

export default SettingsScreen;