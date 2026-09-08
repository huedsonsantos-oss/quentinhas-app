import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
} from 'react-native';
import { colors } from '../../theme';
import Header from '../../components/Header';

const historicoMock = [
  { id: 42, cliente: 'Ana', comunidade: 'Baiana', taxa: 8, entregueEm: '12:30' },
  { id: 41, cliente: 'Carlos', comunidade: 'Vila Cruzeiro', taxa: 10, entregueEm: '12:05' },
  { id: 40, cliente: 'Maria', comunidade: 'Morro do Adeus', taxa: 6, entregueEm: '11:40' },
  { id: 39, cliente: 'Pedro', comunidade: 'Grota', taxa: 7, entregueEm: '11:20' },
  { id: 38, cliente: 'Joana', comunidade: 'Nova Brasília', taxa: 5, entregueEm: '10:55' },
];

export default function HistoricoScreen() {
  const totalHoje = historicoMock.reduce((acc, e) => acc + e.taxa, 0);

  return (
    <View style={styles.container}>
      <Header title="Histórico de Entregas" subtitle="Hoje" />

      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{historicoMock.length}</Text>
          <Text style={styles.statLabel}>Entregas hoje</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>R$ {totalHoje.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Ganhos hoje</Text>
        </View>
      </View>

      <FlatList
        data={historicoMock}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.pedidoId}>#{item.id}</Text>
              <Text style={styles.cliente}>👤 {item.cliente}</Text>
              <Text style={styles.comunidade}>📍 {item.comunidade}</Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.taxa}>R$ {item.taxa.toFixed(2)}</Text>
              <Text style={styles.hora}>🕐 {item.entregueEm}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statsCard: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    height: 40,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardLeft: {
    flex: 1,
  },
  pedidoId: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  cliente: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  comunidade: {
    color: colors.secondary,
    fontSize: 13,
    marginTop: 2,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  taxa: {
    color: colors.success,
    fontSize: 16,
    fontWeight: 'bold',
  },
  hora: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});
