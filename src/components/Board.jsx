import Cell from './Cell'

/**
 * Board component that renders the 3x3 grid
 * @param {Array} board - Current board state
 * @param {Function} onCellClick - Handler for cell clicks
 * @param {Array} winningCells - Array of indices for winning cells
 */
function Board({ board, onCellClick, winningCells }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-fade-in">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinner={winningCells.includes(index)}
        />
      ))}
    </div>
  )
}

export default Board

