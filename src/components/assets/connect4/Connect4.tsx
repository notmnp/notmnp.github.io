import React, { useState, useEffect } from "react";
import "./Connect4.css";
import "../../home/Home.css"
import { getWinLossCount } from "./WinLossCount"; 
import { insertWinLoss } from "./InsertWinLoss";
import ProgressBar from "@ramonak/react-progress-bar";

// === Game Constants === //
const HUMAN_PLAYER = "X";
const AI_PLAYER = "O";
const EMPTY = " ";
const DEPTH = 7;
const ROWS = 6; // Acceptable: 5–7
const COLS = 7; // Acceptable: 6–8

// Type declarations
type Board = string[][];
interface Move {
  row: number;
  col: number;
}

const createBoard = (): Board =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));

const cloneBoard = (board: Board): Board => board.map((row) => [...row]);

const getValidMoves = (board: Board): number[] => {
  const valid: number[] = [];
  for (let col = 0; col < COLS; col++) {
    if (board[0][col] === EMPTY) valid.push(col);
  }
  return valid;
};

const dropPiece = (board: Board, col: number, player: string): number => {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY) {
      board[row][col] = player;
      return row;
    }
  }
  return -1;
};

const evaluateWindow = (window: string[]): number => {
  let score = 0;
  const aiCount = window.filter((cell) => cell === AI_PLAYER).length;
  const humanCount = window.filter((cell) => cell === HUMAN_PLAYER).length;
  const emptyCount = window.filter((cell) => cell === EMPTY).length;
  if (aiCount === 4) score += 100;
  else if (aiCount === 3 && emptyCount === 1) score += 10;
  else if (aiCount === 2 && emptyCount === 2) score += 5;
  if (humanCount === 3 && emptyCount === 1) score -= 50;
  else if (humanCount === 4) score -= 100;
  return score;
};

const evaluateBoard = (board: Board): number => {
  let score = 0;
  // Horizontal evaluation
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const window = [
        board[row][col],
        board[row][col + 1],
        board[row][col + 2],
        board[row][col + 3],
      ];
      score += evaluateWindow(window);
    }
  }
  // Vertical evaluation
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS - 3; row++) {
      const window = [
        board[row][col],
        board[row + 1][col],
        board[row + 2][col],
        board[row + 3][col],
      ];
      score += evaluateWindow(window);
    }
  }
  // Diagonal down-right evaluation
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const window = [
        board[row][col],
        board[row + 1][col + 1],
        board[row + 2][col + 2],
        board[row + 3][col + 3],
      ];
      score += evaluateWindow(window);
    }
  }
  // Diagonal down-left evaluation
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 3; col < COLS; col++) {
      const window = [
        board[row][col],
        board[row + 1][col - 1],
        board[row + 2][col - 2],
        board[row + 3][col - 3],
      ];
      score += evaluateWindow(window);
    }
  }
  return score;
};

const checkWinner = (board: Board): string | null => {
  // Horizontal check
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] !== EMPTY &&
        board[row][col] === board[row][col + 1] &&
        board[row][col] === board[row][col + 2] &&
        board[row][col] === board[row][col + 3]
      )
        return board[row][col];
    }
  }
  // Vertical check
  for (let col = 0; col < COLS; col++) {
    for (let row = 3; row < ROWS; row++) {
      if (
        board[row][col] !== EMPTY &&
        board[row][col] === board[row - 1][col] &&
        board[row][col] === board[row - 2][col] &&
        board[row][col] === board[row - 3][col]
      )
        return board[row][col];
    }
  }
  // Diagonal (down-right) check
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] !== EMPTY &&
        board[row][col] === board[row + 1][col + 1] &&
        board[row][col] === board[row + 2][col + 2] &&
        board[row][col] === board[row + 3][col + 3]
      )
        return board[row][col];
    }
  }
  // Diagonal (down-left) check
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 3; col < COLS; col++) {
      if (
        board[row][col] !== EMPTY &&
        board[row][col] === board[row + 1][col - 1] &&
        board[row][col] === board[row + 2][col - 2] &&
        board[row][col] === board[row + 3][col - 3]
      )
        return board[row][col];
    }
  }
  if (board[0].every((cell) => cell !== EMPTY)) return "Draw";
  return null;
};

interface MinimaxResult {
  column: number;
  score: number;
}

const minimax = (
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean
): MinimaxResult => {
  const validMoves = getValidMoves(board);
  const isTerminal = checkWinner(board) !== null || validMoves.length === 0;
  if (depth === 0 || isTerminal) {
    const win = checkWinner(board);
    if (win === AI_PLAYER) return { column: -1, score: 1000000 };
    else if (win === HUMAN_PLAYER) return { column: -1, score: -1000000 };
    else return { column: -1, score: evaluateBoard(board) };
  }
  if (maximizingPlayer) {
    let maxEval = -Infinity;
    let bestCol = validMoves[Math.floor(Math.random() * validMoves.length)];
    for (const col of validMoves) {
      let row = -1;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === EMPTY) {
          row = r;
          break;
        }
      }
      if (row === -1) continue;
      board[row][col] = AI_PLAYER;
      const { score } = minimax(board, depth - 1, alpha, beta, false);
      board[row][col] = EMPTY;
      if (score > maxEval) {
        maxEval = score;
        bestCol = col;
      }
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return { column: bestCol, score: maxEval };
  } else {
    let minEval = Infinity;
    let bestCol = validMoves[Math.floor(Math.random() * validMoves.length)];
    for (const col of validMoves) {
      let row = -1;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === EMPTY) {
          row = r;
          break;
        }
      }
      if (row === -1) continue;
      board[row][col] = HUMAN_PLAYER;
      const { score } = minimax(board, depth - 1, alpha, beta, true);
      board[row][col] = EMPTY;
      if (score < minEval) {
        minEval = score;
        bestCol = col;
      }
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return { column: bestCol, score: minEval };
  }
};

const Connect4: React.FC = () => {
  const [board, setBoard] = useState<Board>(createBoard());
  // Always start with human turn.
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [gameWinner, setGameWinner] = useState<string | null>(null);
  // Store last computer move (for display in turn indicator)
  const [lastComputerCol, setLastComputerCol] = useState<number | null>(null);
  // Track hovered column index to highlight the entire column
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [wins, setWins] = useState<number | null>(null);
  const [losses, setLosses] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // Fetch win/loss count from Supabase
  useEffect(() => {
    const fetchWinLoss = async () => {
      const { wins, losses } = await getWinLossCount();
      setWins(wins);
      setLosses(losses);
      console.log(`Wins: ${wins}, Losses: ${losses}`); // Print result to console
    };

    fetchWinLoss();
  }, []);

  useEffect(() => {
    if (gameWinner) {
      setShowOverlay(false); // Reset before delay
      setTimeout(() => {
        setShowOverlay(true); // Show overlay after 2 seconds
      }, 1000);
    }
  }, [gameWinner]);

  const startGame = () => {
    setShowOverlay(false);
    const newBoard = createBoard();
    setBoard(newBoard);
    setGameWinner(null);
    setPlayerTurn(true);
    setLastComputerCol(null);
  };

  // Start a new game on component mount
  React.useEffect(() => {
    startGame();
  }, []);

  const handleWin = async (winner: string) => {
    if (winner === AI_PLAYER) {
      await insertWinLoss(1);
    } else if (winner === HUMAN_PLAYER) {
      await insertWinLoss(0); 
    }

    // refresh win/loss count after inserting
    const { wins, losses } = await getWinLossCount();
    setWins(wins);
    setLosses(losses);
  };

  const handleHumanMove = (col: number) => {
    if (gameWinner || !playerTurn) return;
    if (board[0][col] !== EMPTY) return;

    const newBoard = cloneBoard(board);
    dropPiece(newBoard, col, HUMAN_PLAYER);
    setBoard(newBoard);
    const winner = checkWinner(newBoard);
    if (winner) {
      setGameWinner(winner);
      handleWin(winner);
      return;
    }
    setPlayerTurn(false);
    setLastComputerCol(null);
    setTimeout(() => handleAIMove(newBoard), 800);
  };

  const handleAIMove = (currentBoard: Board) => {
    const newBoard = cloneBoard(currentBoard);
    const { column } = minimax(newBoard, DEPTH, -Infinity, Infinity, true);
    if (column === -1) return;
    dropPiece(newBoard, column, AI_PLAYER);
    setBoard(newBoard);
    setLastComputerCol(column);
    const winner = checkWinner(newBoard);
    if (winner) {
      setGameWinner(winner);
      handleWin(winner);
      return;
    }
    setPlayerTurn(true);
  };

  const renderTurnIndicator = () => {
    if (gameWinner) return "";
    if (playerTurn) {
      return lastComputerCol !== null
        ? `Computer Played Column ${lastComputerCol + 1}`
        : "Click a Column to Start";
    } else {
      return "Thinking...";
    }
  };

  const renderWinnerMessage = () => {
    if (gameWinner === HUMAN_PLAYER) return "You Win!";
    else if (gameWinner === AI_PLAYER) return "Computer Wins!";
    else if (gameWinner === "Draw") return "It's a Draw!";
    return "";
  };

  return (
    <div className="connect4-game">
        <h1 className="gradient-title">Minimax Connect 4</h1>
        <div className="game-container">
        <div className="turn-indicator">
          {gameWinner ? renderWinnerMessage() : renderTurnIndicator()}
        </div>
        {showOverlay && (
            <div className="game-over-overlay">
              <button className="play-again-btn" onClick={startGame}>Play Again</button>
            </div>
          )}
        <div
          id="board-container"
          className={`board ${!playerTurn || gameWinner ? "disabled" : ""}`}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`board-cell ${
                  hoveredCol === colIndex ? "highlighted" : ""
                }`}
                onClick={() => handleHumanMove(colIndex)}
                onMouseEnter={() => setHoveredCol(colIndex)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                {cell !== EMPTY && (
                  <div
                    className={`piece ${
                      cell === HUMAN_PLAYER ? "human" : "ai"
                    }`}
                  ></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <h1 className="hiw-title">Cumulative Game Stats</h1>
      <div className="pbar-container">
        <div className="small-box grid-item">
          <div className="total-games">
            {wins !== null && losses !== null ? wins + losses : 0}+
          </div>
          <p className="ai-win-label">Total Games</p>
        </div>  
        <div className="small-box grid-item">
          <div className="ai-win-percentage">
              {wins !== null && losses !== null && (wins + losses) > 0 ? Math.round((wins / (wins + losses)) * 100) : 0}%
          </div>
          <p className="ai-win-label">Win Rate</p>
        </div>
        <div className="small-box grid-item pbar-box">
          <p className="pbar-stats">
            <span className="pbar-stat-label">Computer Wins:</span> 
            <span className="pbar-stat-value">{wins !== null ? wins : "Loading..."}</span> 
            <span className="pbar-separator">|</span> 
            <span className="pbar-stat-label">Losses:</span> 
            <span className="pbar-stat-value">{losses !== null ? losses : "Loading..."}</span>
          </p>          
          <ProgressBar 
              completed={wins !== null && losses !== null && (wins + losses) > 0 ? (wins / (wins + losses)) * 100 : 0}
              animateOnRender
              customLabel=" "
              className="progress-bar-wrapper"
              barContainerClassName="progress-bar-container"
              height="2.5vh"
              bgColor='linear-gradient(90deg, #e53935, #b71c1c)'
          /> 
        </div> 
      </div>
      
      {/* How It Works Section */}
      <h1 className="hiw-title">How it Works</h1>
      <div className="hiw-container">

        <div className="small-box grid-item algorithm-box">
            <h2 className="grid-header">Minimax AI & Scoring</h2>
           
            <p className="hiw-paragraph">Minimax is a decision-making algorithm used by the AI to determine the optimal move. It evaluates possible future board states and selects the move that leads to the best possible outcome:</p>

            <ul className="hiw-list">
                <li>Simulates all potential board states up to a fixed depth.</li>
                <li>Maximizes the AI's advantage while minimizing the opponent's chances.</li>
                <li>Deeper searches provide stronger AI play but require more computation.</li>
            </ul>

            <p className="hiw-paragraph">Each board state is assigned a value based on strategic importance:</p>
            <ul className="hiw-list">
                <li>Winning move: <strong>+1000</strong></li>
                <li>Blocking opponent's win: <strong>+100</strong></li>
                <li>Three-in-a-row: <strong>+10</strong></li>
                <li>Blocking opponent's three-in-a-row: <strong>-50</strong></li>
            </ul>
        </div>

        <div className="small-box grid-item">
            <h2 className="grid-header">Alpha-Beta Pruning</h2>
            <p className="hiw-paragraph">Speeds up AI decision-making by cutting unnecessary calculations.</p>

            <ul className="hiw-list">
                <li>Skips unneeded branches in the game tree.</li>
                <li>Improves efficiency without losing accuracy.</li>
                <li>Allows deeper searches in less time.</li>
            </ul>
        </div>

        <div className="small-box grid-item">
            <h2 className="grid-header">Instant Board Updates</h2>
            <p className="hiw-paragraph">Moves are applied instantly, and the game state updates in real time.</p>

            <ul className="hiw-list">
                <li>Every move triggers an immediate board update.</li>
                <li>AI calculates and responds without delay.</li>
                <li>Game detects wins, losses, and draws automatically.</li>
            </ul>
        </div>
    </div>
    </div>
  );
};

export default Connect4;