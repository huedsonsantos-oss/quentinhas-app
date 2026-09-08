import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, statusLabels } from '../theme';

export default function PedidoCard({ pedido, onAcao, labelAcao, showAcao = false, onDetalhes }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onDetalhes} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.id}>Pedido #{pedido.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: colors.surface }]}>
          <Text style={styles.statusText}>{statusLabels[pedido.status]}</Text>
        </View>
      </View>

      <Text style={styles.cliente}>👤 {pedido.cliente}</Text>
      <Text style={styles.comunidade}>
        <MaterialIcons name="location-on" size={14} color={colors.secondary} /> {pedido.comunidade}
      </Text>
      <Text style={styles.itens}>{pedido.itens.join(' • ')}</Text>

      <View style={styles.footer}>
        <Text style={styles.total}>R$ {pedido.total.toFixed(2)}</Text>
        {showAcao && onAcao && (
          <TouchableOpacity style={styles.acaoButton} onPress={onAcao}>
            <Text style={styles.acaoText}>{labelAcao}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  id: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    color: colors.accent,
    fontWeight: '600',
  },
  cliente: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  comunidade: {
    fontSize: 13,
    color: colors.secondary,
    marginBottom: 4,
  },
  itens: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
  },
  acaoButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  acaoText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
});
