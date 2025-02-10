import React, { useState } from "react";
import "./Connect4.css";
import "../../home/Home.css"

// === Game Constants === //
const HUMAN_PLAYER = "X";
const AI_PLAYER = "O";
const EMPTY = " ";
const DEPTH = 4;
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

  const startGame = () => {
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

  const handleHumanMove = (col: number) => {
    if (gameWinner || !playerTurn) return;
    if (board[0][col] !== EMPTY) return;

    const newBoard = cloneBoard(board);
    dropPiece(newBoard, col, HUMAN_PLAYER);
    setBoard(newBoard);
    const win = checkWinner(newBoard);
    if (win) {
      setGameWinner(win);
      return;
    }
    setPlayerTurn(false);
    setLastComputerCol(null);
    setTimeout(() => handleAIMove(newBoard), 1000);
  };

  const handleAIMove = (currentBoard: Board) => {
    const newBoard = cloneBoard(currentBoard);
    const { column } = minimax(newBoard, DEPTH, -Infinity, Infinity, true);
    if (column === -1) return;
    dropPiece(newBoard, column, AI_PLAYER);
    setBoard(newBoard);
    setLastComputerCol(column);
    const win = checkWinner(newBoard);
    if (win) {
      setGameWinner(win);
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
      return "Computer's Turn...";
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

     {/* How It Works Section */}
    <h1 className="hiw-title">How it Works</h1>
    <div className="hiw-container" id="how-it-works">
        <div className="small-box grid-item">
            <h2 className="grid-header">Interactive Gameplay</h2>
            <p className="hiw-paragraph">
            When you click a column, your move is instantly reflected on the board. The game recalculates and updates the board state in real time, ensuring you always see the most current configuration.
            </p>
        </div>

        <div className="small-box grid-item">
            <h2 className="grid-header">Intelligent Decision Making</h2>
            <p className="hiw-paragraph">
            The AI leverages the Minimax algorithm with Alpha-Beta Pruning to simulate multiple future moves. It carefully examines all possible outcomes, allowing it to choose the most optimal response to your play.
            </p>
        </div>

        <div className="small-box grid-item">
            <h2 className="grid-header">Algorithm Evaluation</h2>
            <p className="hiw-paragraph">
            Each potential board state is scored based on its ability to win, block your moves, and secure strategic advantage. The algorithm evaluates these scores to decide the next move, ensuring calculated and competitive play.
            </p>
        </div>

        <div className="small-box grid-item">
            <h2 className="grid-header">Optimizations</h2>
            <p className="hiw-paragraph">
            To maintain smooth gameplay, the AI’s search is depth-limited (up to 4 moves ahead). Combined with Alpha-Beta Pruning, this approach minimizes unnecessary calculations while delivering fast and effective decision-making.
            </p>
        </div>
    </div>

    </div>
  );
};

export default Connect4;