import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import Header from '../../components/Header';
import Input from '../../components/Input';
import BotaoQuentinha from '../../components/BotaoQuentinha';
import { api } from '../../services/api';

export default function CardapioScreen() {
  const [loja, setLoja] = useState(null);
  const [modal, setModal] = useState(false);
  const [novoItem, setNovoItem] = useState({ nome: '', descricao: '', preco: '' });

  useState(() => {
    api.getLoja(1).then(setLoja);
  }, []);

  const adicionarItem = () => {
    if (!loja) return;
    const item = {
      id: Date.now(),
      nome: novoItem.nome,
      descricao: novoItem.descricao,
      preco: parseFloat(novoItem.preco),
    };
    setLoja({ ...loja, cardapio: [...loja.cardapio, item] });
    setNovoItem({ nome: '', descricao: '', preco: '' });
    setModal(false);
  };

  const removerItem = (id) => {
    setLoja({ ...loja, cardapio: loja.cardapio.filter((i) => i.id !== id) });
  };

  return (
    <View style={styles.container}>
      <Header title="Gerenciar Cardápio" subtitle={loja?.nome || 'Minha Loja'} />

      {loja && (
        <FlatList
          data={loja.cardapio}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemDescricao}>{item.descricao}</Text>
                <Text style={styles.itemPreco}>R$ {item.preco.toFixed(2)}</Text>
              </View>
              <View style={styles.itemActions}>
                <TouchableOpacity style={styles.avisoButton}>
                  <MaterialIcons name="edit" size={20} color={colors.secondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeButton} onPress={() => removerItem(item.id)}>
                  <MaterialIcons name="delete" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <View style={styles.addBar}>
        <BotaoQuentinha title="Adicionar Item" onPress={() => setModal(true)} />
      </View>

      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Item</Text>
            <Input
              label="Nome"
              value={novoItem.nome}
              onChangeText={(t) => setNovoItem({ ...novoItem, nome: t })}
              placeholder="Ex: Quentinha de Strogonoff"
            />
            <Input
              label="Descrição"
              value={novoItem.descricao}
              onChangeText={(t) => setNovoItem({ ...novoItem, descricao: t })}
              placeholder="Ingredientes..."
              multiline
            />
            <Input
              label="Preço"
              value={novoItem.preco}
              onChangeText={(t) => setNovoItem({ ...novoItem, preco: t })}
              placeholder="0.00"
              tipo="numeric"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModal(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <BotaoQuentinha title="Salvar" onPress={adicionarItem} />
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 100,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  itemDescricao: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemPreco: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 10,
  },
  avisoButton: {
    padding: 6,
  },
  removeButton: {
    padding: 6,
  },
  addBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  cancelButton: {
    paddingHorizontal: 20,
  },
  cancelText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
});
