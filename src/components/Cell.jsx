/**
 * Cell component for individual grid cells
 * @param {string} value - The value in the cell ('X', 'O', or null)
 * @param {Function} onClick - Handler for cell click
 * @param {boolean} isWinner - Whether this cell is part of the winning combination
 */
function Cell({ value, onClick, isWinner }) {
  return (
    <button
      onClick={onClick}
      disabled={value !== null}
      className={`
        relative
        w-24 h-24 md:w-32 md:h-32
        flex items-center justify-center
        bg-gradient-to-br from-white to-gray-50
        dark:from-gray-700 dark:to-gray-800
        border-2 border-gray-200 dark:border-gray-600
        rounded-2xl
        font-semibold text-4xl md:text-5xl
        transition-all duration-300 ease-in-out
        shadow-md hover:shadow-xl
        hover:scale-105 hover:-translate-y-1
        active:scale-95 active:translate-y-0
        disabled:cursor-not-allowed
        disabled:hover:scale-100 disabled:hover:translate-y-0
        disabled:opacity-60
        ${isWinner 
          ? 'bg-gradient-to-br from-green-300 to-green-400 dark:from-green-600 dark:to-green-700 border-green-400 dark:border-green-500 animate-pulse-win shadow-lg shadow-green-400/50 dark:shadow-green-600/50' 
          : 'hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20'
        }
        ${value === 'X' ? 'text-blue-600 dark:text-blue-400' : ''}
        ${value === 'O' ? 'text-rose-600 dark:text-rose-400' : ''}
      `}
    >
      {value && (
        <span className="animate-scale-in-bounce drop-shadow-sm">
          {value}
        </span>
      )}
      {!value && !isWinner && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-gray-100/30 dark:to-gray-700/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  )
}

export default Cell

