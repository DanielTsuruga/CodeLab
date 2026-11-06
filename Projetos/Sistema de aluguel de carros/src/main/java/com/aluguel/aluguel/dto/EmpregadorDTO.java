package com.aluguel.aluguel.dto;

import java.math.BigDecimal;

public record EmpregadorDTO(
        String nome,
        BigDecimal rendimento
) {
}
