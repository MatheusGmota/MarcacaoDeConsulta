import { ListItem, Switch } from "react-native-elements"
import { SectionTitle, SettingsCard } from "../styles"
import theme from "../../../styles/theme"
import { useSettings } from "../hook/useSettings"

export const PreferenceSection: React.FC = () => {
    const {
        settings,
        updateSetting
    } = useSettings();

    return (
        <>
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
        </>
    )
}