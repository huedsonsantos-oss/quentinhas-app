import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import { colors } from '../../theme';
import Input from '../../components/Input';
import BotaoQuentinha from '../../components/BotaoQuentinha';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('cliente');

  const tipos = [
    { id: 'cliente', label: 'Cliente', icon: '🛒' },
    { id: 'lojista', label: 'Lojista', icon: '🍳' },
    { id: 'entregador', label: 'Entregador', icon: '🚴' },
  ];

  const handleLogin = async () => {
    await login(email, senha, tipo);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoEmoji}>🍲</Text>
          </View>
          <Text style={styles.title}>Quentinhas</Text>
          <Text style={styles.titleAccent}>do Alemão</Text>
          <Text style={styles.subtitle}>📍 Complexo do Alemão · Zona Norte - RJ</Text>
        </View>

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

        <BotaoQuentinha title="Entrar" onPress={handleLogin} loading={loading} />

        <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Não tem conta? <Text style={styles.registerAccent}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  titleAccent: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: -6,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
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
    fontSize: 16,
  },
  tipoText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  tipoTextActive: {
    color: colors.white,
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  registerAccent: {
    color: colors.accent,
    fontWeight: 'bold',
  },
});
