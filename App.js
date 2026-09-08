import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import ClienteNavigator from './src/navigation/ClienteNavigator';
import LojistaNavigator from './src/navigation/LojistaNavigator';
import EntregadorNavigator from './src/navigation/EntregadorNavigator';
import { colors } from './src/theme';
import { createStackNavigator } from '@react-navigation/stack';
import LojaScreen from './src/screens/cliente/LojaScreen';
import CheckoutScreen from './src/screens/cliente/CheckoutScreen';
import AvaliacaoScreen from './src/screens/cliente/AvaliacaoScreen';
import PedidoStatusScreen from './src/screens/cliente/PedidoStatusScreen';

const Stack = createStackNavigator();

function ClienteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={ClienteNavigator} />
      <Stack.Screen name="Loja" component={LojaScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Pedidos" component={PedidoStatusScreen} />
      <Stack.Screen name="Avaliacao" component={AvaliacaoScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user } = useAuth();

  if (!user) {
    return <AuthNavigator />;
  }

  switch (user.tipo) {
    case 'lojista':
      return <LojistaNavigator />;
    case 'entregador':
      return <EntregadorNavigator />;
    default:
      return <ClienteStack />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
