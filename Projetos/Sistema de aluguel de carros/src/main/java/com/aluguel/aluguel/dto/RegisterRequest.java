package com.aluguel.aluguel.dto;

import com.aluguel.aluguel.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
        @NotBlank String login,
        @NotBlank String senha,
        @NotNull Role role
) {
}
