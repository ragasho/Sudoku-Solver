package com.example.Sudoku.Solver.controller;

import com.example.Sudoku.Solver.model.SudokuRequest;
import com.example.Sudoku.Solver.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sudoku")
@CrossOrigin

public class SudokuController {
    @Autowired
    private SudokuService sudokuService;

    @PostMapping("/solve")
    public int[][] solve(@RequestBody SudokuRequest request) {
        return sudokuService.solve(request.getBoard());
    }

    @PostMapping("/ai-solve")
    public String aiSolve(@RequestBody SudokuRequest request) {
        return sudokuService.solveWithAI(request.getBoard());
    }
}
