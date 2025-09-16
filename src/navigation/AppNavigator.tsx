import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import DoctorDashboardScreen from '../screens/DoctorDashBoardScreen';
import PatientDashboardScreen from '../screens/PatientDashBoardScreen';
import UserManagementScreen from '../screens/UserManagement';
import CreateAppointmentScreen from '../screens/CreateAppointment';
import SettingsScreen from '../screens/Settings';
import ProfileScreen from '../screens/Profile';
import NotificationsScreen from '../screens/Notifications';
import EditProfileScreen from '../screens/EditrProfile';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          // Rotas públicas
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Rotas protegidas
          <>
            {user.role === 'admin' && (
              <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboardScreen}
                options={{ title: 'Painel Administrativo' }}
              />
            )}

            {user.role === 'doctor' && (
              <Stack.Screen
                name="DoctorDashboard"
                component={DoctorDashboardScreen}
                options={{ title: 'Painel do Médico' }}
              />
            )}

            {user.role === 'patient' && (
              <Stack.Screen
                name="PatientDashboard"
                component={PatientDashboardScreen}
                options={{ title: 'Painel do Paciente' }}
              />
            )}

            {/* Rotas comuns para todos os usuários autenticados */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Início' }}
            />
            <Stack.Screen
              name="CreateAppointment"
              component={CreateAppointmentScreen}
              options={{ title: 'Agendar Consulta' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Perfil' }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ title: 'Editar Perfil' }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ title: 'Notificações' }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: 'Configurações' }}
            />
            <Stack.Screen 
              name="UserManagement" 
              component={UserManagementScreen}
              options={{ title: 'Controle de usuários' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 