import React, { useState } from 'react';
import axios from 'axios';

const SudokuSolver = () => {
    const emptyGrid = Array(9).fill(null).map(() => Array(9).fill(""));

    const [board, setBoard] = useState(emptyGrid);
    const [solvedBoard, setSolvedBoard] = useState(null);

    const handleChange = (row, col, value) => {
        if (/^\d?$/.test(value)) {
            const newBoard = [...board];
            newBoard[row][col] = value;
            setBoard(newBoard);
        }
    };

    const handleSolve = async () => {
        const numericBoard = board.map(row => row.map(cell => Number(cell) || 0));
        try {
            const response = await axios.post('http://localhost:8080/api/sudoku/solve', {
                board: numericBoard
            });
            setSolvedBoard(response.data);
        } catch (error) {
            console.error("Error solving Sudoku:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Sudoku Solver</h1>
            <div className="grid grid-cols-9 gap-1 mb-4">
                {board.map((row, i) =>
                    row.map((val, j) => (
                        <input
                            key={`${i}-${j}`}
                            value={val}
                            onChange={(e) => handleChange(i, j, e.target.value)}
                            maxLength={1}
                            className="w-10 h-10 text-center border border-gray-400"
                        />
                    ))
                )}
            </div>
            <button
                onClick={handleSolve}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Solve
            </button>

            {solvedBoard && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Solved Board</h2>
                    <div className="grid grid-cols-9 gap-1">
                        {solvedBoard.map((row, i) =>
                            row.map((val, j) => (
                                <div
                                    key={`solved-${i}-${j}`}
                                    className="w-10 h-10 flex items-center justify-center border bg-green-100"
                                >
                                    {val}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SudokuSolver;