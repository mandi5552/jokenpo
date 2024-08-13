import React, { useState } from 'react';
import './App.css';
import pedra from './assets/moves/pedra.png';
import papel from './assets/moves/papel.png';
import tesoura from './assets/moves/tesoura.png';

function App() {
  const [vencedor, setVencedor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [escolhaJogador, setEscolhaJogador] = useState(null);
  const [escolhaComputador, setEscolhaComputador] = useState(null);
  const [placarJogador, setPlacarJogador] = useState(0);
  const [placarComputador, setPlacarComputador] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [jogoEncerrado, setJogoEncerrado] = useState(false);
  const [mostrarEstatisticas, setMostrarEstatisticas] = useState(false);
  const [totalJogadas, setTotalJogadas] = useState(0);
  const [aviso, setAviso] = useState('');

  const movimentosPossiveis = [
    {
      tipo: 'papel',
      rotulo: 'Papel',
      img: papel,
      ganhaDe: 'pedra',
      perdePara: 'tesoura'
    },
    {
      tipo: 'pedra',
      rotulo: 'Pedra',
      img: pedra,
      ganhaDe: 'tesoura',
      perdePara: 'papel'
    },
    {
      tipo: 'tesoura',
      rotulo: 'Tesoura',
      img: tesoura,
      ganhaDe: 'papel',
      perdePara: 'pedra'
    }
  ];

  const fazerJogada = (jogadaJogador) => {
    setAviso(''); // Limpa qualquer aviso existente

    if (jogoEncerrado) return;

    const jogadaComputador = movimentosPossiveis[Math.floor(Math.random() * movimentosPossiveis.length)];
    setEscolhaJogador(jogadaJogador);
    setEscolhaComputador(jogadaComputador.tipo);
    setTotalJogadas(totalJogadas + 1); // Atualiza o total de jogadas

    if (jogadaComputador.tipo === jogadaJogador) {
      setVencedor('Empate');
      setMensagem('EMPATE!');
      setEmpates(empates + 1);
    } else {
      const jogadaJogadorValida = movimentosPossiveis.find(jogada => jogada.tipo === jogadaJogador);
      const jogadorGanhou = jogadaJogadorValida.ganhaDe === jogadaComputador.tipo;

      if (jogadorGanhou) {
        setVencedor('Jogador');
        setMensagem('VOCÊ VENCEU!');
        setPlacarJogador(placarJogador + 1);
      } else {
        setVencedor('Computador');
        setMensagem('VOCÊ PERDEU!');
        setPlacarComputador(placarComputador + 1);
      }
    }

    setJogoEncerrado(true);
  };

  const jogarNovamente = () => {
    if (totalJogadas === 0) {
      setAviso('Faça sua jogada!'); // Mensagem de aviso se nenhuma jogada foi feita
      return;
    }
    
    
    setVencedor('');
    setMensagem('');
    setEscolhaJogador(null);
    setEscolhaComputador(null);
    setJogoEncerrado(false);
    setMostrarEstatisticas(false); 
  };

  const encerrarJogo = () => {
    if (totalJogadas === 0) {
      setAviso('Faça sua jogada!'); // Mensagem de aviso se nenhuma jogada foi feita
      return;
    }

    setMostrarEstatisticas(true); // Exibe as estatísticas
    setJogoEncerrado(true); // Permite que o jogo seja jogado novamente
  };

  const reiniciarJogo = () => {
    setPlacarJogador(0); // Zera o placar do jogador
    setPlacarComputador(0); // Zera o placar do computador
    setEmpates(0); // Zera o número de empates
    setTotalJogadas(0); // Zera o total de jogadas

    setVencedor('');
    setMensagem('');
    setEscolhaJogador(null);
    setEscolhaComputador(null);
    setJogoEncerrado(false);
    setMostrarEstatisticas(false);
  };

  return (
    <div className="app">
      <header className="header-container">
        <div className="header-content">
          <div className="game-title">Jokenpô</div>
          <div className="game-scoreboard">
            <span className="scoreboard-text">Placar:</span>
            <span className="scoreboard-score">{placarJogador} - {placarComputador}</span>
          </div>
        </div>
      </header>

      <div className="main-content">
        {aviso && <div className="aviso">{aviso}</div>} {/* Exibe a mensagem de aviso */}
        
        {vencedor && !mostrarEstatisticas && (
          <div className="resultado">
            <h2>{mensagem}</h2>
            <div className="escolhas">
              {escolhaJogador && (
                <div className="movimento">
                  <h3>Você escolheu:</h3>
                  <img src={movimentosPossiveis.find(m => m.tipo === escolhaJogador)?.img} alt={escolhaJogador} />
                  <p>{movimentosPossiveis.find(m => m.tipo === escolhaJogador)?.rotulo}</p>
                </div>
              )}
              {escolhaComputador && (
                <div className="movimento">
                  <h3>Computador escolheu:</h3>
                  <img src={movimentosPossiveis.find(m => m.tipo === escolhaComputador)?.img} alt={escolhaComputador} />
                  <p>{movimentosPossiveis.find(m => m.tipo === escolhaComputador)?.rotulo}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {!jogoEncerrado && !mostrarEstatisticas && (
          <div className="botoes">
            {movimentosPossiveis.map((movimento) => (
              <button key={movimento.tipo} onClick={() => fazerJogada(movimento.tipo)}>
                <img src={movimento.img} alt={movimento.rotulo} />
                <p>{movimento.rotulo}</p>
              </button>
            ))}
          </div>
        )}

        {mostrarEstatisticas && (
          <div className="estatisticas-card">
            <h2>Estatísticas do Jogo</h2>
            <p><strong>Total de Jogadas:</strong> {totalJogadas}</p>
            <p><strong>Pontuação do Jogador:</strong> {placarJogador}</p>
            <p><strong>Pontuação do Computador:</strong> {placarComputador}</p>
            <p><strong>Empates:</strong> {empates}</p>
            <button onClick={reiniciarJogo}>Reiniciar</button>
          </div>
        )}

        {!mostrarEstatisticas && (
          <div className="controle">
            <button className="jogar-novamente" onClick={jogarNovamente} disabled={jogoEncerrado && totalJogadas === 0}>Jogar Novamente</button>
            <button className="encerrar-jogo" onClick={encerrarJogo} disabled={totalJogadas === 0}>Encerrar Jogo</button>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>by Amanda Tarsia</p>
      </footer>
    </div>
  );
}

export default App;
