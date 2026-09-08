import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, comunidades } from '../../theme';
import Header from '../../components/Header';
import LojaCard from '../../components/LojaCard';
import Loading from '../../components/Loading';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comunidade, setComunidade] = useState(user?.comunidade || 'Morro do Alemão');
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    carregarLojas();
  }, [comunidade]);

  const carregarLojas = async () => {
    setLoading(true);
    const resultado = await api.listarLojasPorComunidade(comunidade);
    setLojas(resultado);
    setLoading(false);
  };

  const lojasFiltradas = lojas.filter((l) =>
    l.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Header title="Lojas" subtitle={`📍 ${comunidade}`} />

      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={20} color={colors.textMuted} />
        <TouchableOpacity style={styles.searchInput} onPress={() => {}}>
          <Text style={styles.searchPlaceholder}>Buscar quentinhas...</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.comunidadeBar}>
        {comunidades.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.chip, comunidade === c.nome && styles.chipActive]}
            onPress={() => setComunidade(c.nome)}
          >
            <Text style={[styles.chipText, comunidade === c.nome && styles.chipTextActive]}>
              {c.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={lojasFiltradas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <LojaCard
            loja={item}
            onPress={() => navigation.navigate('Loja', { lojaId: item.id, lojaNome: item.nome })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyText}>Nenhuma loja em {comunidade} agora</Text>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
  },
  searchPlaceholder: {
    color: colors.textMuted,
    fontSize: 14,
  },
  comunidadeBar: {
    flexGrow: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chip: {
    backgroundColor: colors.inputBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
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
