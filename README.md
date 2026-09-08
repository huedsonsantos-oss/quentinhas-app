# 🍲 Quentinhas do Alemão

App de entrega de quentinhas no Complexo do Alemão, Zona Norte do Rio de Janeiro.

## 📱 Sobre

Aplicativo mobile (React Native + Expo) com 3 perfis de usuário:

- **🛒 Cliente**: vê lojas, faz pedidos, paga via Pix, acompanha entrega
- **🍳 Lojista**: gerencia cardápio e pedidos
- **🚴 Entregador**: encontra entregas e navega até o cliente

## 🗺️ Comunidades atendidas

1. Morro do Alemão
2. Nova Brasília
3. Grota
4. Morro das Palmeiras
5. Morro do Adeus
6. Baiana
7. Morro do Piancó
8. Morro do Reservatório
9. Morro do Timbau
10. Vila Cruzeiro
11. Parque Alvorada
12. Joaquim de Queiroz
13. Morro do Itararé
14. Morro do Relicário
15. Fazendinha
16. Serra da Misericórdia

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Iniciar o app
npx expo start

# Rodar no Android
npx expo start --android
```

## 📁 Estrutura

```
src/
├── navigation/     # Navegação por perfil
├── screens/
│   ├── auth/       # Login e cadastro
│   ├── cliente/    # Telas do cliente
│   ├── lojista/    # Telas do lojista
│   └── entregador/ # Telas do entregador
├── components/     # Componentes reutilizáveis
├── context/        # Contexto de autenticação
├── services/       # Chamadas à API
└── theme/          # Paleta de cores e comunidades
```

## 🎨 Tema

Cores inspiradas no Complexo do Alemão:

- 🔴 Vermelho vivo (paixão da cozinha) `#E63946`
- 🔵 Azul céu do morro `#457B9D`
- 🟠 Dourado da quentinha quente `#F4A261`
- 🔵 Azul escuro da noite `#1D3557`

## 🔗 Repositório

Projeto criado por [@huedsonsantos-oss](https://github.com/huedsonsantos-oss)

Feito com ❤️ para a comunidade do Complexo do Alemão.
