import { useState, useEffect } from 'react'
import Board from './components/Board'
import ThemeToggle from './components/ThemeToggle'

/**
 * Main App component that manages game state and logic
 */
function App() {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [winningCells, setWinningCells] = useState([])
  const [isDraw, setIsDraw] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  /**
   * Check if there's a winner or draw
   * @param {Array} currentBoard - The current board state
   * @returns {Object} - Object with winner info and winning cells
   */
  const checkWinner = (currentBoard) => {
    // Winning combinations (rows, columns, diagonals)
    const winPatterns = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal top-left to bottom-right
      [2, 4, 6], // Diagonal top-right to bottom-left
    ]

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], winningCells: pattern }
      }
    }

    // Check for draw
    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'draw', winningCells: [] }
    }

    return { winner: null, winningCells: [] }
  }

  /**
   * Handle cell click
   * @param {number} index - Index of the clicked cell
   */
  const handleCellClick = (index) => {
    // Don't allow moves if game is over or cell is already filled
    if (board[index] || winner || isDraw) {
      return
    }

    // Create new board state
    const newBoard = [...board]
    newBoard[index] = currentPlayer

    // Update board
    setBoard(newBoard)

    // Check for winner or draw
    const { winner: gameWinner, winningCells: winCells } = checkWinner(newBoard)

    if (gameWinner === 'draw') {
      setIsDraw(true)
      setWinner(null)
      setWinningCells([])
    } else if (gameWinner) {
      setWinner(gameWinner)
      setWinningCells(winCells)
      setIsDraw(false)
    } else {
      // Switch player
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
      setIsDraw(false)
      setWinningCells([])
    }
  }

  /**
   * Reset the game to initial state
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setWinningCells([])
    setIsDraw(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Animated background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="text-center mb-8 relative z-10 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-800 via-indigo-800 to-gray-800 dark:from-gray-100 dark:via-indigo-200 dark:to-gray-100 bg-clip-text text-transparent">
          Tic-Tac-Toe
        </h1>
        <div className="h-16 flex items-center justify-center">
          {winner ? (
            <span className="font-bold text-xl md:text-2xl text-green-600 dark:text-green-400 animate-pulse-win drop-shadow-sm">
              🎉 Player {winner} wins! 🎉
            </span>
          ) : isDraw ? (
            <span className="font-bold text-xl md:text-2xl text-amber-600 dark:text-amber-400 animate-pulse-win drop-shadow-sm">
              It's a draw! 🤝
            </span>
          ) : (
            <span className="font-semibold text-lg md:text-xl text-gray-700 dark:text-gray-300">
              Player{' '}
              <span 
                className={`
                  inline-block font-bold text-2xl md:text-3xl mx-2 px-4 py-2 rounded-xl
                  ${currentPlayer === 'X' 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                    : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30'
                  }
                  animate-player-pulse shadow-md
                `}
              >
                {currentPlayer}
              </span>
              's turn
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10">
        <Board
          board={board}
          onCellClick={handleCellClick}
          winningCells={winningCells}
        />
      </div>

      <button
        onClick={resetGame}
        className="mt-8 relative z-10 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-700 dark:hover:to-purple-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0"
      >
        New Game
      </button>
    </div>
  )
}

export default App

