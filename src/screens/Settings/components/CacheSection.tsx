import { InfoItem, InfoLabel, InfoValue, SectionTitle, SettingsCard } from "../styles"

interface CacheSectionProps {
    storageInfo: any
}

export const CacheSection: React.FC<CacheSectionProps> = (storageInfo: any) => {
    return (
        <>
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
        </>
    )
}