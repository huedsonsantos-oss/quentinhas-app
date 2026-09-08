import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
} from 'react-native';
import { colors } from '../../theme';
import Header from '../../components/Header';
import PedidoCard from '../../components/PedidoCard';
import Loading from '../../components/Loading';
import { api } from '../../services/api';

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    const resultado = await api.listarPedidosLojista();
    const entregues = resultado.filter((p) => p.status === 'entregue');
    setPedidos(entregues);
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Header title="Histórico de Pedidos" subtitle="Pedidos entregues" />
      <FlatList
        data={pedidos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PedidoCard pedido={item} onDetalhes={() => {}} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum pedido entregue ainda</Text>
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
  list: {
    padding: 16,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
  },
});
