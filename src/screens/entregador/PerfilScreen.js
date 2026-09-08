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
    { label: 'Avaliação', value: '4.9 ⭐', icon: 'star' },
    { label: 'Entregas', value: '320', icon: 'delivery-dining' },
    { label: 'Disponível', value: 'Online', icon: 'wifi' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil do Entregador</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.nome?.charAt(0)?.toUpperCase() || 'E'}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.nome}>{user?.nome || 'Entregador'}</Text>
          <Text style={styles.comunidade}>📍 {user?.comunidade || 'Nova Brasília'}</Text>
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
          { label: 'Disponibilidade', icon: 'schedule', extra: 'Disponível agora' },
          { label: 'Área de atuação', icon: 'map' },
          { label: 'Método de pagamento', icon: 'payments' },
          { label: 'Notificações', icon: 'notifications' },
        ].map((cfg) => (
          <TouchableOpacity key={cfg.label} style={styles.configRow}>
            <MaterialIcons name={cfg.icon} size={20} color={colors.secondary} />
            <View style={styles.configTextWrap}>
              <Text style={styles.configText}>{cfg.label}</Text>
              {cfg.extra && <Text style={styles.configExtra}>{cfg.extra}</Text>}
            </View>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.success,
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
  configTextWrap: {
    flex: 1,
  },
  configText: {
    color: colors.text,
    fontSize: 15,
  },
  configExtra: {
    color: colors.success,
    fontSize: 12,
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 30,
  },
});
