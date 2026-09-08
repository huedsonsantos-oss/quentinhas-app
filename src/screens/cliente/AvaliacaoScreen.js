import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import BotaoQuentinha from '../../components/BotaoQuentinha';

export default function AvaliacaoScreen({ route, navigation }) {
  const pedidoId = route.params?.pedidoId || 45;
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const [notaEntregador, setNotaEntregador] = useState(5);

  const renderEstrelas = (valor, setValor) => {
    return (
      <View style={styles.estrelas}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity key={n} onPress={() => setValor(n)}>
            <MaterialIcons
              name={n <= valor ? 'star' : 'star-border'}
              size={36}
              color={colors.warning}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const enviar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Avaliar Pedido</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.pedidoLabel}>Pedido #{pedidoId}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como foi a comida?</Text>
        {renderEstrelas(nota, setNota)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como foi o entregador?</Text>
        {renderEstrelas(notaEntregador, setNotaEntregador)}
      </View>

      <TouchableOpacity
        style={styles.comentarioBox}
        onPress={() => setComentario('')}
      >
        <Text style={clr => clr}>
          {comentario || 'Escreva um comentário...'}
        </Text>
      </TouchableOpacity>

      <BotaoQuentinha title="Enviar Avaliação" onPress={enviar} />
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
  pedidoLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 20,
  },
  section: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  estrelas: {
    flexDirection: 'row',
    gap: 6,
  },
  comentarioBox: {
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    padding: 14,
    minHeight: 60,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
});
