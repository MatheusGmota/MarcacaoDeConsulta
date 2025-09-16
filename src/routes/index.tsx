import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAppointmentScreen from '../screens/CreateAppointment';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/Profile';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateAppointment" component={CreateAppointmentScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
