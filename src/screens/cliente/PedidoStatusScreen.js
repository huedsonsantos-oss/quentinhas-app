import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import MapaEntrega from '../../components/MapaEntrega';
import BotaoQuentinha from '../../components/BotaoQuentinha';

export default function PedidoStatusScreen({ route }) {
  const pedidoId = route.params?.pedidoId || 45;
  const [status, setStatus] = useState('saiu_para_entrega');
  const [entregador] = useState({ nome: 'Carlos', nota: 4.9, telefone: '(21) 99999-1234' });

  const etapas = [
    { key: 'confirmado', label: 'Pedido confirmado' },
    { key: 'preparando', label: 'Preparando...' },
    { key: 'saiu_para_entrega', label: 'Saiu para entrega' },
    { key: 'entregue', label: 'Entregue' },
  ];

  const indiceAtual = etapas.findIndex((e) => e.key === status);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Acompanhar Pedido</Text>
        <Text style={styles.pedidoId}>Pedido #{pedidoId}</Text>
      </View>

      <MapaEntrega status={status} />

      <View style={styles.timeline}>
        {etapas.map((etapa, index) => {
          const concluida = index <= indiceAtual;
          const atual = index === indiceAtual;
          return (
            <View key={etapa.key} style={styles.etapa}>
              <View style={styles.etapaIconCol}>
                <View
                  style={[
                    styles.etapaDot,
                    concluida && styles.etapaDotAtivo,
                    atual && styles.etapaDotAtual,
                  ]}
                >
                  {concluida && <MaterialIcons name="check" size={14} color={colors.white} />}
                </View>
                {index < etapas.length - 1 && (
                  <View style={[styles.etapaLine, concluida && styles.etapaLineAtivo]} />
                )}
              </View>
              <View style={styles.etapaInfo}>
                <Text style={[styles.etapaLabel, concluida && styles.etapaLabelAtivo]}>
                  {etapa.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.entregadorCard}>
        <View style={styles.entregadorIcon}>
          <Text style={styles.entregadorEmoji}>🚴</Text>
        </View>
        <View style={styles.entregadorInfo}>
          <Text style={styles.entregadorNome}>{entregador.nome}</Text>
          <Text style={styles.entregadorNota}>⭐ {entregador.nota}</Text>
        </View>
        <TouchableOpacity style={styles.telefoneButton}>
          <MaterialIcons name="phone" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      {status === 'entregue' && (
        <BotaoQuentinha
          title="Avaliar Pedido"
          onPress={() => {}}
        />
      )}

      <TouchableOpacity style={styles.ajudaLink} onPress={() => {}}>
        <Text style={styles.ajudaText}>Precisa de ajuda? Fale com o suporte</Text>
      </TouchableOpacity>
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
  timeline: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  etapa: {
    flexDirection: 'row',
  },
  etapaIconCol: {
    alignItems: 'center',
    marginRight: 14,
  },
  etapaDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etapaDotAtivo: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  etapaDotAtual: {
    borderColor: colors.accent,
  },
  etapaLine: {
    width: 2,
    flex: 1,
    minHeight: 24,
    backgroundColor: colors.border,
  },
  etapaLineAtivo: {
    backgroundColor: colors.success,
  },
  etapaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  etapaLabel: {
    color: colors.textMuted,
    fontSize: 15,
  },
  etapaLabelAtivo: {
    color: colors.text,
    fontWeight: '600',
  },
  entregadorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
  },
  entregadorIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entregadorEmoji: {
    fontSize: 24,
  },
  entregadorInfo: {
    flex: 1,
  },
  entregadorNome: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  entregadorNota: {
    color: colors.warning,
    fontSize: 13,
    marginTop: 2,
  },
  telefoneButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ajudaLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  ajudaText: {
    color: colors.secondary,
    fontSize: 13,
  },
});
