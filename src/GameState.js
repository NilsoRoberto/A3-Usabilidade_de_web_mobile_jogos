import { createContext, useContext, useReducer } from 'react';

const GameStateContext = createContext();

const initialState = {
  user: null, // Dados do usuário logado
  isAuthenticated: false,
  loadingIndex: null,
  loadingProgress: 0,
  dinheiro: 50,
  score: 0,
  inventario: [],
  caixas: {
    caixa1: Array(8).fill(null),
    caixa2: Array(8).fill(null),
    caixa3: Array(8).fill(null),
  },
  multiplicadorVenda: 1,
  multiplicadorColheita: 1,
  hasAskedToQuit: false,
  hasFinishedGame: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...initialState // Reseta para o estado inicial
      };
    case 'SET_DINHEIRO':
      return { ...state, dinheiro: action.payload };
    case 'SET_SCORE':
      return { ...state, score: action.payload };
    case 'SET_INVENTARIO':
      return { ...state, inventario: action.payload };
    case 'SET_CAIXAS':
      return { ...state, caixas: action.payload };
    case 'SET_MULTIPLICADOR_VENDA':
      return { ...state, multiplicadorVenda: action.payload };
    case 'SET_MULTIPLICADOR_COLHETA':
      return { ...state, multiplicadorColheita: action.payload };
    // Adicione outros casos conforme necessário
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}

export function GameStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState deve ser usado dentro de um GameStateProvider');
  }
  return context;
}