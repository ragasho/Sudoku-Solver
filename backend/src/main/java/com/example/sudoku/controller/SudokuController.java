package com.example.sudoku.controller;

import com.example.sudoku.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sudoku")
@CrossOrigin(origins = "*")
public class SudokuController {

    @Autowired
    private SudokuService sudokuService;

    @PostMapping("/solve")
    public int[][] solveSudoku(@RequestBody int[][] board) {
        sudokuService.solve(board);
        return board;
    }
}
