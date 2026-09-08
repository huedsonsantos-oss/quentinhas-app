import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function LojaCard({ loja, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="restaurant" size={32} color={colors.accent} />
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>{loja.nome}</Text>
        <Text style={styles.comunidade}>
          <MaterialIcons name="location-on" size={14} color={colors.secondary} /> {loja.comunidade}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.nota}>
            <MaterialIcons name="star" size={14} color={colors.warning} /> {loja.nota} ({loja.avaliacoes})
          </Text>
          <Text style={styles.tempo}>
            <MaterialIcons name="schedule" size={14} color={colors.textSecondary} /> {loja.tempoEntrega}
          </Text>
        </View>
        <Text style={styles.preco}>a partir de R$ {loja.precoMin}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  comunidade: {
    fontSize: 13,
    color: colors.secondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 12,
  },
  nota: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tempo: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  preco: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '600',
    marginTop: 4,
  },
});
