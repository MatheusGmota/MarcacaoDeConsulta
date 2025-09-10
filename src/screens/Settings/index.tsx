import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button, ListItem, Switch } from 'react-native-elements';
import { useSettings } from './hook/useSettings';
import { Container, InfoItem, InfoLabel, InfoValue, LoadingContainer, LoadingText, SectionTitle, SettingsCard, styles, Title } from './styles';
import Header from '../../components/Header';
import theme from '../../styles/theme';


const SettingsScreen: React.FC = () => {
    const {
        navigation,
        settings,
        loading,
        storageInfo,
        updateSetting,
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

                <SectionTitle>Preferências</SectionTitle>
                <SettingsCard>
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>Notificações</ListItem.Title>
                            <ListItem.Subtitle>Receber notificações push</ListItem.Subtitle>
                        </ListItem.Content>
                        <Switch
                            value={settings.notifications}
                            onValueChange={(value) => updateSetting('notifications', value)}
                            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>Backup Automático</ListItem.Title>
                            <ListItem.Subtitle>Criar backups automaticamente</ListItem.Subtitle>
                        </ListItem.Content>
                        <Switch
                            value={settings.autoBackup}
                            onValueChange={(value) => updateSetting('autoBackup', value)}
                            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                        />
                    </ListItem>
                </SettingsCard>

                <SectionTitle>Dados e Armazenamento</SectionTitle>
                <SettingsCard>
                    {storageInfo && (
                        <>
                            <InfoItem>
                                <InfoLabel>Itens no Cache:</InfoLabel>
                                <InfoValue>{storageInfo.cacheSize}</InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>Total de Chaves:</InfoLabel>
                                <InfoValue>{storageInfo.totalKeys}</InfoValue>
                            </InfoItem>
                        </>
                    )}
                </SettingsCard>

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