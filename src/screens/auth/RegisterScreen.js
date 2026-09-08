import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import { colors, comunidades } from '../../theme';
import Input from '../../components/Input';
import BotaoQuentinha from '../../components/BotaoQuentinha';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { registrar, loading } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('cliente');
  const [comunidade, setComunidade] = useState('Morro do Alemão');

  const tipos = [
    { id: 'cliente', label: 'Cliente', icon: '🛒' },
    { id: 'lojista', label: 'Lojista', icon: '🍳' },
    { id: 'entregador', label: 'Entregador', icon: '🚴' },
  ];

  const handleRegister = async () => {
    await registrar({ nome, email, senha, tipo, comunidade });
    if (tipo !== 'cliente') {
      // Lojista e entregador vão para suas telas após registrar
      navigation.navigate('SemRedirect');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Junte-se à comunidade de quentinhas</Text>

        <View style={styles.tipoSelector}>
          {tipos.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[styles.tipoButton, tipo === t.id && styles.tipoButtonActive]}
              onPress={() => setTipo(t.id)}
            >
              <Text style={styles.tipoIcon}>{t.icon}</Text>
              <Text style={[styles.tipoText, tipo === t.id && styles.tipoTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input
          label="Nome completo"
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          tipo="email-address"
        />
        <Input
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="••••••••"
          secureTextEntry
        />

        <View style={styles.comunidadeBlock}>
          <Text style={styles.label}>Sua comunidade</Text>
          <View style={styles.comunidadeGrid}>
            {comunidades.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[styles.comunidadeChip, comunidade === c.nome && styles.comunidadeChipActive]}
                onPress={() => setComunidade(c.nome)}
              >
                <Text style={[styles.comunidadeText, comunidade === c.nome && styles.comunidadeTextActive]}>
                  {c.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <BotaoQuentinha title="Cadastrar" onPress={handleRegister} loading={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  tipoSelector: {
    flexDirection: 'row',
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  tipoButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  tipoButtonActive: {
    backgroundColor: colors.primary,
  },
  tipoIcon: {
    fontSize: 14,
  },
  tipoText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  tipoTextActive: {
    color: colors.white,
  },
  comunidadeBlock: {
    marginBottom: 20,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '600',
  },
  comunidadeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  comunidadeChip: {
    backgroundColor: colors.inputBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  comunidadeChipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  comunidadeText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  comunidadeTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
