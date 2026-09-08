import colors from './colors';

export { colors };

export const comunidades = [
  { id: 1, nome: 'Morro do Alemão' },
  { id: 2, nome: 'Nova Brasília' },
  { id: 3, nome: 'Grota' },
  { id: 4, nome: 'Morro das Palmeiras' },
  { id: 5, nome: 'Morro do Adeus' },
  { id: 6, nome: 'Baiana' },
  { id: 7, nome: 'Morro do Piancó' },
  { id: 8, nome: 'Morro do Reservatório' },
  { id: 9, nome: 'Morro do Timbau' },
  { id: 10, nome: 'Vila Cruzeiro' },
  { id: 11, nome: 'Parque Alvorada' },
  { id: 12, nome: 'Joaquim de Queiroz' },
  { id: 13, nome: 'Morro do Itararé' },
  { id: 14, nome: 'Morro do Relicário' },
  { id: 15, nome: 'Fazendinha' },
  { id: 16, nome: 'Serra da Misericórdia' },
];

export const statusPedido = {
  PENDENTE: 'pendente',
  CONFIRMADO: 'confirmado',
  PREPARANDO: 'preparando',
  PRONTO: 'pronto',
  SAIU: 'saiu_para_entrega',
  ENTREGUE: 'entregue',
};

export const statusLabels = {
  [statusPedido.PENDENTE]: 'Pendente',
  [statusPedido.CONFIRMADO]: 'Confirmado',
  [statusPedido.PREPARANDO]: 'Preparando...',
  [statusPedido.PRONTO]: 'Pronto!',
  [statusPedido.SAIU]: 'Saiu para entrega',
  [statusPedido.ENTREGUE]: 'Entregue',
};
