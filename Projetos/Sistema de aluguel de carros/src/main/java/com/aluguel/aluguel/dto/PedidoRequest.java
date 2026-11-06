package com.aluguel.aluguel.dto;

import jakarta.validation.constraints.NotNull;

public record PedidoRequest(
        @NotNull Long automovelId
) {
}
