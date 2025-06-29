package com.example.sudoku.service;

import org.springframework.stereotype.Service;

@Service
public class SudokuService {

    public boolean solve(int[][] board) {

        if (!isValidSudoku(board)) {
            return false; // Invalid Sudoku board
        }
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == 0) {
                    for (int num = 1; num <= 9; num++) {
                        if (canProceed(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    public boolean isValidSudoku(int[][] board) {

        boolean[][] rowCheck = new boolean[9][9];
        boolean[][] colCheck = new boolean[9][9];
        boolean[][] boxCheck = new boolean[9][9];

        for (int row = 0; row < 9; row++) {
            for (int col = 0; col <9 ; col++) {
                int val = board[row][col];
                if (val == 0) {
                    continue; // Skip empty cells
                }
                else {
                    int num = val - 1; // Adjust for 0-indexing
                    int boxIndex = (row / 3) * 3 + (col / 3);
                    if (rowCheck[row][num] || colCheck[col][num] || boxCheck[boxIndex][num]) {
                        return false; // Duplicate found
                    }
                    rowCheck[row][num] = true;
                    colCheck[col][num] = true;
                    boxCheck[boxIndex][num] = true;
                }
            }
        } return true;
    }

    private boolean canProceed(int[][] board, int row, int col, int num) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == num || board[i][col] == num ||
                board[row - row % 3 + i / 3][col - col % 3 + i % 3] == num) {
                return false;
            }
        }
        return true;
    }
}
