import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import BotaoQuentinha from '../../components/BotaoQuentinha';
import { useAuth } from '../../context/AuthContext';

export default function PerfilScreen() {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Avaliação', value: '4.8 ⭐', icon: 'star' },
    { label: 'Pedidos', value: '256', icon: 'receipt-long' },
    { label: 'Tempo médio', value: '28 min', icon: 'schedule' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil da Loja</Text>
      </View>

      <View style={styles.lojaCard}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🍳</Text>
        </View>
        <View style={styles.lojaInfo}>
          <Text style={styles.lojaNome}>{user?.nome || 'Minha Loja'}</Text>
          <Text style={styles.lojaMeta}>📍 {user?.comunidade || 'Nova Brasília'}</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={22} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        {stats.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <MaterialIcons name={s.icon} size={20} color={colors.accent} />
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView style={styles.configSection}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        {[
          { label: 'Horários de funcionamento', icon: 'schedule' },
          { label: 'Taxa de entrega', icon: 'payments' },
          { label: 'Áreas de entrega', icon: 'map' },
          { label: 'Notificações', icon: 'notifications' },
        ].map((cfg) => (
          <TouchableOpacity key={cfg.label} style={styles.configRow}>
            <MaterialIcons name={cfg.icon} size={20} color={colors.secondary} />
            <Text style={styles.configText}>{cfg.label}</Text>
            <MaterialIcons name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ))}

        <View style={styles.logoutButton}>
          <BotaoQuentinha title="Sair" variant="secondary" onPress={logout} />
        </View>
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
  lojaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    gap: 14,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 26,
  },
  lojaInfo: {
    flex: 1,
  },
  lojaNome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
  },
  lojaMeta: {
    fontSize: 13,
    color: colors.secondary,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  configSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    gap: 12,
  },
  configText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 30,
  },
});
