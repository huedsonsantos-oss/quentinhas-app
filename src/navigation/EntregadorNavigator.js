import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme';

import DisponiveisScreen from '../screens/entregador/DisponiveisScreen';
import EntregaScreen from '../screens/entregador/EntregaScreen';
import HistoricoEntregadorScreen from '../screens/entregador/HistoricoScreen';
import PerfilEntregadorScreen from '../screens/entregador/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function EntregadorNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Disponiveis"
        component={DisponiveisScreen}
        options={{
          tabBarLabel: 'Disponíveis',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="delivery-dining" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Entrega"
        component={EntregaScreen}
        options={{
          tabBarLabel: 'Em Entrega',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-bike" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Historico"
        component={HistoricoEntregadorScreen}
        options={{
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilEntregadorScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
