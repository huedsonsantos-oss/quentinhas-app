import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
} from 'react-native';
import { colors } from '../../theme';
import Header from '../../components/Header';
import PedidoCard from '../../components/PedidoCard';
import Loading from '../../components/Loading';
import { api } from '../../services/api';

export default function DashboardScreen({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    const resultado = await api.listarPedidosLojista();
    const ativos = resultado.filter((p) => !['entregue'].includes(p.status));
    setPedidos(ativos);
    setLoading(false);
  };

  const atualizarStatus = (pedidoId) => {
    setPedidos((atual) =>
      atual.map((p) => {
        if (p.id === pedidoId) {
          if (p.status === 'pendente') return { ...p, status: 'preparando' };
          if (p.status === 'preparando') return { ...p, status: 'pronto' };
          if (p.status === 'pronto') return { ...p, status: 'saiu_para_entrega' };
        }
        return p;
      })
    );
  };

  const labelAcao = (status) => {
    if (status === 'pendente') return 'Iniciar';
    if (status === 'preparando') return 'Pronto';
    if (status === 'pronto') return 'Entregue';
    return '';
  };

  if (loading) return <Loading />;

  const pendentes = pedidos.filter((p) => p.status === 'pendente');
  const emAndamento = pedidos.filter((p) => p.status !== 'pendente');

  return (
    <View style={styles.container}>
      <Header title="Painel do Lojista" subtitle="Complexo do Alemão" />

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pedidos.length}</Text>
          <Text style={styles.statLabel}>Pedidos hoje</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            R$ {pedidos.reduce((acc, p) => acc + p.total, 0).toFixed(0)}
          </Text>
          <Text style={styles.statLabel}>Faturamento</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pendentes.length}</Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
      </View>

      <FlatList
        data={emAndamento}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Pedidos em andamento</Text>
        }
        renderItem={({ item }) => (
          <PedidoCard
            pedido={item}
            showAcao
            labelAcao={labelAcao(item.status)}
            onAcao={() => atualizarStatus(item.id)}
            onDetalhes={() => {}}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum pedido ativo</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    marginTop: 4,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
  },
});
