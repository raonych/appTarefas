import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/Login';
import HomeScreen from './components/Home';
import RegistroScreen from './components/Registro';
import PerfilScreen from './components/Perfil';
import SplashScreen from './components/SplashScreen';
import RegistroTarefaScreen from './components/RegistroTarefa';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="RegistroTarefa" component={RegistroTarefaScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
