## Sistema de Agendamento de Consultas Médicas (Clínica App)
Aplicativo mobile para marcação e gestão de consultas médicas com perfis de administrador, médico e paciente, desenvolvido como um projeto acadêmico em React Native (Expo) e TypeScript.

### Autores
- Felipe Seiki Hashiguti — RM: 98985
- Lucas Corradini Silveira — RM: 555118
- Matheus Gregorio Mota — RM: 557254

### O que é o projeto
- **Descrição**: App de clínica que permite cadastrar pacientes, agendar consultas, enviar notificações internas e acompanhar estatísticas.
- **Objetivo**: Simular de ponta a ponta o fluxo de agendamento e acompanhamento de consultas com persistência local e UI moderna.

### Perfis de usuário
- **Admin**: visão geral do sistema, estatísticas, lista de usuários e consultas.
- **Médico**: agenda própria, confirma/cancela consultas, acompanha estatísticas pessoais.
- **Paciente**: agenda suas consultas, vê histórico e recebe notificações.

### Principais funcionalidades
- **Autenticação e acesso**:
  - Login simulado com `AsyncStorage`, gerenciamento de sessão via `AuthContext`.
  - Diferenciação por perfil (`admin`, `doctor`, `patient`) com rotas protegidas.
- **Agendamento de consultas**:
  - Seleção de data, horário e médico (componentes `TimeSlotList` e `DoctorList`).
  - Persistência local em `@MedicalApp:appointments`.
- **Notificações internas**:
  - Confirmação, cancelamento, lembretes e novas consultas.
  - Persistência em `@MedicalApp:notifications` e badge dinâmico no cabeçalho.
- **Dashboards e estatísticas**:
  - Totais, percentuais por status e especialidades mais buscadas (geral e por usuário).
- **Perfil e foto**:
  - Visualização e edição do perfil com seleção/captura de imagem via `expo-image-picker`.
- **Configurações**:
  - Preferências (notificações, tema, idioma), backup/restore e limpeza de cache/dados.

### Arquitetura e tecnologias
- **Stack**: React Native (Expo), TypeScript, `styled-components`, `react-native-elements`, `@react-navigation/native`.
- **Estado e navegação**: `AuthContext` centraliza sessão; `AppNavigator` exibe rotas públicas (Login/Registro) e privadas por perfil.
- **Persistência**: `AsyncStorage` encapsulado por `storageService` (cache em memória, backup/restore e chaves padronizadas).

### Fluxo geral
- `App.tsx`: aplica tema e provê `AuthProvider`.
- `src/contexts/AuthContext.tsx`: carrega usuário salvo, autentica, registra, atualiza perfil.
- `src/navigation/AppNavigator.tsx`: define rotas públicas e privadas por `user.role`.

### Serviços e dados
- `authService`: usuários mockados (admin/médicos) e criação de pacientes.
- `notificationService`: CRUD local de notificações e eventos do sistema.
- `statisticsService`: métricas gerais e por usuário.
- `imageService`: permissões, seleção/captura e persistência de foto de perfil (base64).
- `storageService`: acesso centralizado ao `AsyncStorage`, cache, backup e restore.

### Telas principais
- `LoginScreen` e `RegisterScreen`: acesso e cadastro de pacientes.
- `CreateAppointmentScreen`: criação de consultas.
- `AdminDashboardScreen`, `DoctorDashboardScreen`, `PatientDashboardScreen`: gestão e visão de consultas com ações de confirmação/cancelamento.
- `ProfileScreen` e `EditProfileScreen`: dados do usuário e imagem de perfil.
- `NotificationsScreen` e `SettingsScreen`: notificações e preferências (com backup/limpeza).

### Como testar rapidamente
- **Credenciais demo**:
  - Admin: `admin@example.com` / `123456`
  - Médicos: `joao@example.com`, `maria@example.com`, `pedro@example.com` (senha `123456`)
- **Fluxo sugerido**:
  1. Logar como paciente e agendar uma consulta.
  2. Logar como médico e confirmar/cancelar.
  3. Voltar ao paciente e verificar notificações e status.

### Como executar
- Instale dependências: `npm install`
- Inicie o app: `npm run start` (ou `npm run android` / `npm run web`)

### Limitações e escopo
- Sem backend real (POC/protótipo didático com dados locais).
- Segurança simplificada (senha padrão para demonstração).
- Notificações internas (sem push externo).
