import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function DisponiveisScreen({ navigation }) {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const resultado = await api.listarPedidosDisponiveis();
    const disponiveis = resultado.filter((p) => !['saiu_para_entrega', 'entregue'].includes(p.status));
    setPedidos(disponiveis);
    setLoading(false);
  };

  const aceitar = async (pedidoId) => {
    await api.aceitarEntrega(pedidoId);
    setPedidos((atual) => atual.filter((p) => p.id !== pedidoId));
    navigation.navigate('Entrega');
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Header title="Entregas Disponíveis" subtitle={`📍 ${user?.comunidade || 'Nova Brasília'}`} />

      <FlatList
        data={pedidos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.idBox}>
                <Text style={styles.idText}>#{item.id}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status === 'pronto' ? 'Pronto' : 'Novo'}</Text>
              </View>
            </View>

            <View style={styles.route}>
              <View style={styles.routeItem}>
                <Text style={styles.routeEmoji}>🏪</Text>
                <Text style={styles.routeText}>{item.loja}</Text>
              </View>
              <Text style={styles.routeArrow}>↓</Text>
              <View style={styles.routeItem}>
                <Text style={styles.routeEmoji}>🏠</Text>
                <Text style={styles.routeText}>
                  {item.cliente} · {item.comunidade}
                </Text>
              </View>
            </View>

            <View style={styles.cardMeta}>
              <View style={styles.metaItem}>
                <MaterialIcons name="payments" size={16} color={colors.success} />
                <Text style={styles.metaText}>R$ {item.taxa.toFixed(2)}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="straighten" size={16} color={colors.secondary} />
                <Text style={styles.metaText}>{item.itens.length > 1 ? '2.5 km' : '1.2 km'}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaText}>{item.itens.length} item(item)s</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.aceitarButton} onPress={() => aceitar(item.id)}>
              <Text style={styles.aceitarText}>ACEITAR ENTREGA</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🛵</Text>
            <Text style={styles.emptyText}>Nenhuma entrega disponível no momento</Text>
          </View>
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
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  idBox: {
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  idText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  route: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeEmoji: {
    fontSize: 16,
  },
  routeText: {
    color: colors.text,
    fontSize: 14,
    flex: 1,
  },
  routeArrow: {
    color: colors.textMuted,
    marginLeft: 29,
    fontSize: 16,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  aceitarButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
  },
  aceitarText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
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
    textAlign: 'center',
  },
});
