import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import BotaoQuentinha from '../../components/BotaoQuentinha';
import { api } from '../../services/api';

export default function CheckoutScreen({ route, navigation }) {
  const { itens, loja, total, taxaEntrega, subtotal } = route.params;
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [confirmando, setConfirmando] = useState(false);
  const [qrcodeVisivel, setQrcodeVisivel] = useState(false);

  const metodos = [
    { id: 'pix', label: 'Pix', icon: 'qr-code' },
    { id: 'dinheiro', label: 'Dinheiro', icon: 'payments' },
  ];

  const confirmarPedido = async () => {
    setConfirmando(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const pedido = {
      cliente: 'Você',
      loja: loja?.nome,
      lojaId: loja?.id,
      comunidade: loja?.comunidade,
      itens: itens.map((i) => `${i.qtd}x ${i.nome}`),
      total,
      taxaEntrega,
      metodo: metodoPagamento,
    };

    const novo = await api.criarPedido(pedido);
    setConfirmando(false);

    setQrcodeVisivel(true);
    setTimeout(() => {
      setQrcodeVisivel(false);
      navigation.replace('Pedidos', { pedidoId: novo.id });
    }, 3000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pagamento</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.resumoCard}>
        <Text style={styles.sectionTitle}>Resumo</Text>
        {itens.map((i) => (
          <View key={i.id} style={styles.resumoRow}>
            <Text style={styles.resumoLabel}>{i.qtd}x {i.nome}</Text>
            <Text style={styles.resumoValue}>R$ {(i.qtd * i.preco).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.resumoRow}>
          <Text style={styles.resumoLabel}>Entrega</Text>
          <Text style={styles.resumoValue}>R$ {taxaEntrega.toFixed(2)}</Text>
        </View>
        <View style={[styles.resumoRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Método de pagamento</Text>
      <View style={styles.metodosList}>
        {metodos.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[styles.metodoCard, metodoPagamento === m.id && styles.metodoCardActive]}
            onPress={() => setMetodoPagamento(m.id)}
          >
            <MaterialIcons name={m.icon} size={24} color={metodoPagamento === m.id ? colors.accent : colors.textSecondary} />
            <Text style={[styles.metodoText, metodoPagamento === m.id && styles.metodoTextActive]}>
              {m.label}
            </Text>
            <View style={[styles.radio, metodoPagamento === m.id && styles.radioActive]} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.enderecoCard}>
        <MaterialIcons name="location-on" size={20} color={colors.secondary} />
        <View style={styles.enderecoInfo}>
          <Text style={styles.enderecoTitle}>Endereço de entrega</Text>
          <Text style={styles.enderecoText}>Rua Principal, Complexo do Alemão, RJ</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.editar}>Editar</Text>
        </TouchableOpacity>
      </View>

      <BotaoQuentinha title={`Confirmar (R$ ${total.toFixed(2)})`} onPress={confirmarPedido} loading={confirmando} />

      <Modal visible={qrcodeVisivel} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>💳</Text>
            <Text style={styles.modalTitle}>Pix</Text>
            <View style={styles.qrcodeBox}>
              <Text style={styles.qrcodeEmoji}>📱</Text>
              <Text style={styles.qrcodeText}>QR Code</Text>
            </View>
            <Text style={styles.modalSubtitle}>Aponte a câmera para pagar</Text>
            <Text style={styles.modalValor}>R$ {total.toFixed(2)}</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  back: {
    color: colors.text,
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSpacer: {
    width: 24,
  },
  resumoCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  resumoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  resumoLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    flex: 1,
  },
  resumoValue: {
    color: colors.text,
    fontSize: 13,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
  },
  metodosList: {
    gap: 10,
    marginBottom: 20,
  },
  metodoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  metodoCardActive: {
    borderColor: colors.accent,
  },
  metodoText: {
    color: colors.textSecondary,
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
  metodoTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  radioActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  enderecoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  enderecoInfo: {
    flex: 1,
  },
  enderecoTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  enderecoText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  editar: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    width: '85%',
  },
  modalEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  qrcodeBox: {
    width: 180,
    height: 180,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  qrcodeEmoji: {
    fontSize: 50,
  },
  qrcodeText: {
    color: colors.black,
    fontSize: 14,
    marginTop: 6,
    fontWeight: '600',
  },
  modalSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  modalValor: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
