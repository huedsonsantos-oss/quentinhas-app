import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import ItemCardapio from '../../components/ItemCardapio';
import Loading from '../../components/Loading';
import { api } from '../../services/api';

export default function LojaScreen({ route, navigation }) {
  const { lojaId, lojaNome } = route.params;
  const [loja, setLoja] = useState(null);
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarLoja();
  }, []);

  const carregarLoja = async () => {
    const resultado = await api.getLoja(lojaId);
    setLoja(resultado);
    setLoading(false);
  };

  const adicionarAoCarrinho = (item) => {
    setCarrinho((atual) => {
      const existente = atual.find((i) => i.id === item.id);
      if (existente) {
        return atual.map((i) =>
          i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i
        );
      }
      return [...atual, { ...item, qtd: 1 }];
    });
  };

  if (loading) return <Loading />;

  const totalItens = carrinho.reduce((acc, i) => acc + i.qtd, 0);
  const totalPreco = carrinho.reduce((acc, i) => acc + i.qtd * i.preco, 0);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        <Text style={styles.backText}>{lojaNome}</Text>
      </TouchableOpacity>

      <FlatList
        data={loja.cardapio}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.lojaInfo}>
            <View style={styles.lojaHeader}>
              <View style={styles.iconBox}>
                <Text style={styles.iconText}>🍲</Text>
              </View>
              <View style={styles.lojaInfoText}>
                <Text style={styles.lojaNome}>{loja.nome}</Text>
                <Text style={styles.lojaDescricao}>{loja.descricao}</Text>
                <Text style={styles.lojaMeta}>
                  ⭐ {loja.nota} ({loja.avaliacoes}) · ⏱️ {loja.tempoEntrega}
                </Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Cardápio</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ItemCardapio item={item} onAdd={() => adicionarAoCarrinho(item)} />
        )}
      />

      {totalItens > 0 && (
        <TouchableOpacity
          style={styles.cartBar}
          onPress={() => navigation.navigate('Carrinho', { itens: carrinho, loja })}
        >
          <View>
            <Text style={styles.cartTitle}>
              🛒 {totalItens} item{totalItens > 1 ? 's' : ''}
            </Text>
            <Text style={styles.cartTotal}>R$ {totalPreco.toFixed(2)}</Text>
          </View>
          <Text style={styles.cartCta}>Ver carrinho →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  backText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  lojaInfo: {
    marginBottom: 16,
  },
  lojaHeader: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 28,
  },
  lojaInfoText: {
    flex: 1,
  },
  lojaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  lojaDescricao: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lojaMeta: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 18,
    marginBottom: 10,
  },
  cartBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  cartTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  cartTotal: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  cartCta: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
