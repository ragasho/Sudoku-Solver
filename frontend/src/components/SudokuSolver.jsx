import React, { useState, useRef } from 'react';


const SudokuSolver = () => {
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [solvedBoard, setSolvedBoard] = useState(null);

    const inputRefs = useRef(Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => React.createRef())
    ));


    const handleChange = (row, col, value) => {
        if (value === '' || /^[1-9]$/.test(value)) {
            const newBoard = board.map(row => [...row]);
            newBoard[row][col] = value;
            setBoard(newBoard);
        }
    };

    const handleKeyDown = (e, row, col) => {
        const moveFocus = (r, c) => {
            if (r >= 0 && r < 9 && c >= 0 && c < 9) {
                inputRefs.current[r][c].current?.focus();
            }
        };

        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                moveFocus(row - 1, col);
                break;
            case 'ArrowDown':
                e.preventDefault();
                moveFocus(row + 1, col);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                moveFocus(row, col - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                moveFocus(row, col + 1);
                break;
            default:
                break;
        }
    };


    const handleSolve = async () => {
    try {
      const response = await fetch("https://sudoku-solver-noo0.onrender.com/api/sudoku/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board)
      });
      const data = await response.json();
      setSolvedBoard(data);
    } catch (error) {
      alert("Error solving Sudoku");
    }
  };

    return (
        <div className="flex flex-col items-center mt-8">
            <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md animate-pulse">
                🧠 Sudoku Solver
            </h2>
            <p className="text-center text-gray-600 text-lg mb-6">
                Enter the Sudoku you want to solve
            </p>

            {/* Sudoku Grid */}
            <div className="grid grid-cols-9 gap-0.5 border-[3px] border-black transition-all duration-300">
                {board.map((row, i) =>
                    row.map((cell, j) => {
                        const isOriginal = board[i][j] !== '';
                        const valueToShow = solvedBoard ? solvedBoard[i][j] : cell;

                        // Determine thick border for 3x3 blocks
                        const thickBorderClasses = `
            ${i % 3 === 0 ? 'border-t-4' : ''}
            ${j % 3 === 0 ? 'border-l-4' : ''}
            ${i === 8 ? 'border-b-4' : ''}
            ${j === 8 ? 'border-r-4' : ''}
          `;

                        return (
                            <input
                                key={`${i}-${j}`}
                                ref={inputRefs.current[i][j]}
                                className={`w-12 h-12 text-center text-xl bg-white rounded shadow-inner
    border border-gray-400 focus:outline-none transition-all duration-300
    ${thickBorderClasses}
    ${isOriginal ? 'text-black font-semibold' : 'text-blue-600 font-bold animate-pulse'}
    ${solvedBoard ? 'bg-blue-50' : ''}
  `}
                                value={valueToShow}
                                onChange={(e) => handleChange(i, j, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, i, j)}
                                disabled={solvedBoard && isOriginal}
                                maxLength={1}
                            />
                        );
                    })
                )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4 justify-center">
                {solvedBoard ? (
                    <button
                        onClick={() => setSolvedBoard(null)}
                        className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded shadow transition-all"
                    >
                        Unsolve
                    </button>
                ) : (
                    <button
                        onClick={handleSolve}
                        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow transition-all"
                    >
                        Solve
                    </button>
                )}

                <button
                    onClick={() => {
                        const emptyBoard = Array(9).fill().map(() => Array(9).fill(''));
                        setBoard(emptyBoard);
                        setSolvedBoard(null);
                    }}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded shadow transition-all">
                    Clear
                </button>
            </div>
        </div>
    );

};

export default SudokuSolver;
