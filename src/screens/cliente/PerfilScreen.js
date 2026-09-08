import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import BotaoQuentinha from '../../components/BotaoQuentinha';
import { useAuth } from '../../context/AuthContext';
import { comunidades } from '../../theme';

export default function PerfilScreen({ navigation }) {
  const { user, logout } = useAuth();

  const opcoes = [
    { id: 'pedidos', label: 'Meus Pedidos', icon: 'receipt-long' },
    { id: 'enderecos', label: 'Meus Endereços', icon: 'location-on' },
    { id: 'pagamentos', label: 'Métodos de Pagamento', icon: 'credit-card' },
    { id: 'ajuda', label: 'Ajuda & Suporte', icon: 'help-outline' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.nome?.charAt(0).toUpperCase() || 'U'}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.nome}>{user?.nome || 'Usuário'}</Text>
          <Text style={styles.comunidade}>📍 {user?.comunidade || 'Morro do Alemão'}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.opcoesList}>
        {opcoes.map((opcao) => (
          <TouchableOpacity key={opcao.id} style={styles.optionRow}>
            <MaterialIcons name={opcao.icon} size={22} color={colors.secondary} />
            <Text style={styles.optionText}>{opcao.label}</Text>
            <MaterialIcons name="chevron-right" size={22} color={colors.textMuted} />
          </TouchableOpacity>
        ))}

        <View style={styles.comunidadeSection}>
          <Text style={styles.comunidadeTitle}>Comunidades do Complexo</Text>
          {comunidades.map((c) => (
            <Text key={c.id} style={styles.comunidadeItem}>
              • {c.nome}
            </Text>
          ))}
        </View>

        <BotaoQuentinha title="Sair" variant="secondary" onPress={logout} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
  },
  comunidade: {
    fontSize: 13,
    color: colors.secondary,
    marginTop: 4,
  },
  opcoesList: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    gap: 12,
  },
  optionText: {
    color: colors.text,
    fontSize: 15,
    flex: 1,
  },
  comunidadeSection: {
    marginTop: 16,
    marginBottom: 20,
  },
  comunidadeTitle: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  comunidadeItem: {
    color: colors.text,
    fontSize: 13,
    marginBottom: 4,
  },
});
