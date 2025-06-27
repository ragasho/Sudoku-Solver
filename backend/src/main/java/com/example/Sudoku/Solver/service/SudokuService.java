package com.example.Sudoku.Solver.service;

import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.messages.ChatMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SudokuService {

    private final ChatClient chatClient;

    // Constructor injection is preferred for final fields
    public SudokuService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public int[][] solve(int[][] board) {
        // Your traditional backtracking logic should go here
        return board;
    }

    public String solveWithAI(int[][] board) {
        StringBuilder promptBuilder = new StringBuilder("Solve this Sudoku:\n");
        for (int[] row : board) {
            for (int val : row) {
                promptBuilder.append(val).append(" ");
            }
            promptBuilder.append("\n");
        }

        // ✅ Wrap ChatMessage in Prompt
        Prompt prompt = new Prompt(List.of(
                new ChatMessage("user", promptBuilder.toString())
        ));

        return chatClient.call(prompt)
                .getResult()
                .getOutput()
                .getContent();
    }
}
