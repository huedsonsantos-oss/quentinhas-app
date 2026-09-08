const API_URL = 'http://localhost:8000';

const lojasMock = [
  {
    id: 1,
    nome: 'Quentinha da Márcio',
    descricao: 'Comida caseira feita com amor',
    comunidade: 'Nova Brasília',
    nota: 4.8,
    avaliacoes: 120,
    tempoEntrega: '25-35 min',
    precoMin: 15,
    foto: null,
    cardapio: [
      { id: 101, nome: 'Quentinha Completa', descricao: 'Arroz, feijão, carne, salada, farofa', preco: 18 },
      { id: 102, nome: 'Quentinha de Frango', descricao: 'Arroz, feijão, frango, vinagrete', preco: 15 },
      { id: 103, nome: 'Picanha Premium', descricao: 'Arroz, feijão, picanha, mandioca', preco: 25 },
    ],
  },
  {
    id: 2,
    nome: 'Comida da Grota',
    descricao: 'Tradição e sabor da Grota',
    comunidade: 'Grota',
    nota: 4.6,
    avaliacoes: 85,
    tempoEntrega: '30-40 min',
    precoMin: 12,
    foto: null,
    cardapio: [
      { id: 201, nome: 'Quentinha da Casa', descricao: 'Arroz, feijão, carne moída, batata', preco: 12 },
      { id: 202, nome: 'Feijoada Quentinha', descricao: 'Feijoada completa + arroz + couve', preco: 22 },
      { id: 203, nome: 'Executivo Picanha', descricao: 'Arroz, feijão, picanha, farofa, vinagrete', preco: 28 },
    ],
  },
  {
    id: 3,
    nome: 'Sabor do Adeus',
    descricao: 'Quentinhas gostosas com preço justo',
    comunidade: 'Morro do Adeus',
    nota: 4.5,
    avaliacoes: 60,
    tempoEntrega: '20-30 min',
    precoMin: 14,
    foto: null,
    cardapio: [
      { id: 301, nome: 'Frango Grelhado', descricao: 'Arroz, feijão, frango grelhado, salada', preco: 16 },
      { id: 302, nome: 'Carne de Panela', descricao: 'Arroz, feijão, carne de panela, legumes', preco: 17 },
      { id: 303, nome: 'Mista da Casa', descricao: 'Arroz, feijão, frango + carne, salada', preco: 20 },
    ],
  },
];

const pedidosMock = [
  {
    id: 45,
    cliente: 'Maria',
    loja: 'Quentinha da Márcio',
    lojaId: 1,
    comunidade: 'Morro do Adeus',
    itens: ['2x Quentinha Completa'],
    total: 36,
    taxa: 6,
    status: 'preparando',
    criadoEm: new Date().toISOString(),
  },
  {
    id: 44,
    cliente: 'João',
    loja: 'Comida da Grota',
    lojaId: 2,
    comunidade: 'Vila Cruzeiro',
    itens: ['1x Quentinha de Frango'],
    total: 15,
    taxa: 10,
    status: 'pronto',
    criadoEm: new Date().toISOString(),
  },
  {
    id: 43,
    cliente: 'Ana',
    loja: 'Sabor do Adeus',
    lojaId: 3,
    comunidade: 'Baiana',
    itens: ['1x Feijoada Quentinha'],
    total: 22,
    taxa: 8,
    status: 'pendente',
    criadoEm: new Date().toISOString(),
  },
];

const entregadoresMock = [
  { id: 1, nome: 'Carlos', nota: 4.9, entregas: 320, comunidade: 'Nova Brasília' },
  { id: 2, nome: 'Joana', nota: 4.7, entregas: 250, comunidade: 'Grota' },
  { id: 3, nome: 'Pedro', nota: 4.8, entregas: 410, comunidade: 'Morro do Alemão' },
];

export const api = {
  login: (email, senha) => Promise.resolve({ token: 'mock-token', user: { nome: email.split('@')[0], email } }),

  listarLojas: () => Promise.resolve(lojasMock),

  listarLojasPorComunidade: (comunidade) =>
    Promise.resolve(comunidade ? lojasMock.filter((l) => l.comunidade === comunidade) : lojasMock),

  getLoja: (id) => {
    const loja = lojasMock.find((l) => l.id === id);
    return Promise.resolve({ ...loja, cardapio: loja.cardapio });
  },

  criarPedido: (pedido) => {
    const novoPedido = {
      ...pedido,
      id: 60 + Math.floor(Math.random() * 100),
      status: 'pendente',
      criadoEm: new Date().toISOString(),
    };
    return Promise.resolve(novoPedido);
  },

  getPedidoStatus: (id) => {
    const pedido = pedidosMock.find((p) => p.id === id);
    return Promise.resolve(pedido || { status: 'saiu_para_entrega' });
  },

  listarPedidosLojista: () => Promise.resolve(pedidosMock),

  listarPedidosDisponiveis: () => Promise.resolve(pedidosMock.filter((p) => p.status === 'pendente' || p.status === 'pronto')),

  aceitarEntrega: (id) => {
    const pedido = pedidosMock.find((p) => p.id === id);
    if (pedido) pedido.status = 'saiu_para_entrega';
    return Promise.resolve(pedido);
  },

  finalizarEntrega: (id) => {
    const pedido = pedidosMock.find((p) => p.id === id);
    if (pedido) pedido.status = 'entregue';
    return Promise.resolve(pedido);
  },

  criarAvaliacao: (avaliacao) => Promise.resolve({ ...avaliacao, id: 900 + Math.floor(Math.random() * 100) }),

  listarEntregadores: () => Promise.resolve(entregadoresMock),
};

export default API_URL;
