import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function MapaEntrega({ status }) {
  const codigoCor = (s) => {
    if (s === 'entregue') return colors.success;
    if (s === 'saiu_para_entrega') return colors.primary;
    if (s === 'pronto') return colors.warning;
    return colors.textMuted;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapEmoji}>🗺️</Text>
        <Text style={styles.mapText}>Mapa de entrega em tempo real</Text>
        <View style={styles.markers}>
          <Text style={styles.marker}>📍 Loja</Text>
          <Text style={[styles.marker, { color: colors.primary }]}>🚴 Entregador</Text>
          <Text style={styles.marker}>🏠 Você</Text>
        </View>
      </View>
      <View style={[styles.statusBar, { backgroundColor: codigoCor(status) }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mapEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  mapText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 12,
  },
  markers: {
    flexDirection: 'row',
    gap: 16,
  },
  marker: {
    color: colors.text,
    fontSize: 12,
  },
  statusBar: {
    height: 4,
  },
});
