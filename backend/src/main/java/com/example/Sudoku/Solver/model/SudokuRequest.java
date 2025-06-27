package com.example.Sudoku.Solver.model;

public class SudokuRequest {
    private int[][] board;

    public SudokuRequest() {
    }

    public SudokuRequest(int[][] board) {
        this.board = board;
    }

    public int[][] getBoard() {
        return board;
    }

    public void setBoard(int[][] board) {
        this.board = board;
    }
}
