import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { colors } from '../../theme';
import MapaEntrega from '../../components/MapaEntrega';
import BotaoQuentinha from '../../components/BotaoQuentinha';

export default function EntregaScreen({ navigation }) {
  const [status, setStatus] = useState('saiu_para_entrega');
  const [info] = useState({
    id: 45,
    cliente: 'Maria',
    endereco: 'Rua Principal, Morro do Adeus',
    loja: 'Quentinha da Márcio',
    itens: ['2x Quentinha Completa'],
    total: 36,
    taxa: 6,
    telefone: '(21) 99999-5678',
  });

  const confirmarEntrega = () => {
    setStatus('entregue');
    navigation.navigate('Historico');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Entrega em Andamento</Text>
        <Text style={styles.pedidoId}>Pedido #{info.id}</Text>
      </View>

      <MapaEntrega status={status} />

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Detalhes da Entrega</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Cliente</Text>
          <Text style={styles.infoValue}>👤 {info.cliente}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Endereço</Text>
          <Text style={styles.infoValue}>📍 {info.endereco}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Loja</Text>
          <Text style={styles.infoValue}>🏪 {info.loja}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Itens</Text>
          <Text style={styles.infoValue}>{info.itens.join(', ')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Valor a receber</Text>
          <Text style={[styles.infoValue, styles.valor]}>R$ {info.taxa.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.telefoneRow}>
        <Text style={styles.telefoneText}>Ligar para o cliente: {info.telefone}</Text>
      </TouchableOpacity>

      <BotaoQuentinha
        title="Confirmar Entrega"
        onPress={confirmarEntrega}
        variant={status === 'entregue' ? 'secondary' : 'primary'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  pedidoId: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  infoValue: {
    color: colors.text,
    fontSize: 13,
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  valor: {
    color: colors.success,
    fontWeight: 'bold',
    fontSize: 16,
  },
  telefoneRow: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
  },
  telefoneText: {
    color: colors.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
