import StatisticsCard from "../../../components/StatisticsCard"
import { Statistics } from "../../../services/statistics"
import theme from "../../../styles/theme"
import { SectionTitle, SpecialtyContainer, SpecialtyCount, SpecialtyItem, SpecialtyName, StatisticsGrid } from "../styles"

interface StatisticSectionProps {
    statistics: Partial<Statistics | null>
}

const StatisticSection: React.FC<StatisticSectionProps> = ({ statistics }) => {

    return (
        <>
            <SectionTitle>Estatísticas Gerais</SectionTitle>
            {statistics && (
                <StatisticsGrid>
                    <StatisticsCard
                        title="Total de Consultas"
                        value={statistics.totalAppointments}
                        color={theme.colors.primary}
                        subtitle="Todas as consultas"
                    />
                    <StatisticsCard
                        title="Consultas Confirmadas"
                        value={statistics.confirmedAppointments}
                        color={theme.colors.success}
                        subtitle={`${statistics.statusPercentages?.confirmed.toFixed(1)}% do total`}
                    />
                    <StatisticsCard
                        title="Pacientes Ativos"
                        value={statistics.totalPatients}
                        color={theme.colors.secondary}
                        subtitle="Pacientes únicos"
                    />
                    <StatisticsCard
                        title="Médicos Ativos"
                        value={statistics.totalDoctors}
                        color={theme.colors.warning}
                        subtitle="Médicos com consultas"
                    />
                </StatisticsGrid>
            )}

            <SectionTitle>Especialidades Mais Procuradas</SectionTitle>
                {statistics && Object.entries(statistics.specialties ?? {}).length > 0 && (
                    <SpecialtyContainer>
                        {Object.entries(statistics.specialties ?? {})
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 3)
                            .map(([specialty, count]) => (
                                <SpecialtyItem key={specialty}>
                                    <SpecialtyName>{specialty}</SpecialtyName>
                                    <SpecialtyCount>{count} consultas</SpecialtyCount>
                                </SpecialtyItem>
                            ))
                        }
                    </SpecialtyContainer>
                )}
        </>
    )
}

export default StatisticSection;