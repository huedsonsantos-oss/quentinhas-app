import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { colors } from '../../theme';
import BotaoQuentinha from '../../components/BotaoQuentinha';

export default function CarrinhoScreen({ route, navigation }) {
  const itens = route.params?.itens || [];
  const loja = route.params?.loja || null;
  const [itensCarrinho, setItensCarrinho] = useState(itens);

  const aumentar = (id) => {
    setItensCarrinho((atual) =>
      atual.map((i) => (i.id === id ? { ...i, qtd: i.qtd + 1 } : i))
    );
  };

  const diminuir = (id) => {
    setItensCarrinho((atual) =>
      atual
        .map((i) => (i.id === id ? { ...i, qtd: i.qtd - 1 } : i))
        .filter((i) => i.qtd > 0)
    );
  };

  const subtotal = itensCarrinho.reduce((acc, i) => acc + i.qtd * i.preco, 0);
  const taxaEntrega = 5.0;
  const total = subtotal + taxaEntrega;

  const finalizar = () => {
    navigation.navigate('Checkout', {
      itens: itensCarrinho,
      loja,
      total,
      taxaEntrega,
      subtotal,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Meu Pedido</Text>
          <View style={styles.headerSpacer} />
        </View>

        {loja && (
          <View style={styles.lojaBar}>
            <Text style={styles.lojaNome}>🍳 {loja.nome}</Text>
            <Text style={styles.lojaComunidade}>📍 {loja.comunidade}</Text>
          </View>
        )}

        {itensCarrinho.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🛒</Text>
            <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          </View>
        ) : (
          <View style={styles.itensList}>
            {itensCarrinho.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemPreco}>R$ {item.preco.toFixed(2)}</Text>
                </View>
                <View style={styles.qtdControls}>
                  <TouchableOpacity style={styles.qtdButton} onPress={() => diminuir(item.id)}>
                    <Text style={styles.qtdButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtd}>{item.qtd}</Text>
                  <TouchableOpacity style={styles.qtdButton} onPress={() => aumentar(item.id)}>
                    <Text style={styles.qtdButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {itensCarrinho.length > 0 && (
        <View style={styles.resumo}>
          <View style={styles.resumoRow}>
            <Text style={styles.resumoLabel}>Subtotal</Text>
            <Text style={styles.resumoValue}>R$ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.resumoRow}>
            <Text style={styles.resumoLabel}>Entrega</Text>
            <Text style={styles.resumoValue}>R$ {taxaEntrega.toFixed(2)}</Text>
          </View>
          <View style={[styles.resumoRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
          </View>
          <BotaoQuentinha title="Finalizar Pedido" onPress={finalizar} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 240,
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
  lojaBar: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  lojaNome: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  lojaComunidade: {
    fontSize: 13,
    color: colors.secondary,
    marginTop: 2,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  itensList: {
    gap: 10,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  itemPreco: {
    fontSize: 13,
    color: colors.success,
    marginTop: 2,
  },
  qtdControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtdButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtdButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtd: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
  resumo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  resumoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  resumoLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  resumoValue: {
    color: colors.text,
    fontSize: 14,
  },
  totalRow: {
    marginTop: 6,
    marginBottom: 12,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.accent,
  },
});
