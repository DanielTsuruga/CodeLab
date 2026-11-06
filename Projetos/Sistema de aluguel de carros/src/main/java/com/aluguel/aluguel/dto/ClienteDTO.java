package com.aluguel.aluguel.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

public record ClienteDTO(
        String rg,
        @NotBlank String cpf,
        @NotBlank String nome,
        String endereco,
        String profissao,
        @Size(max = 3, message = "Máximo de 3 empregadores")
        @Valid
        List<EmpregadorDTO> empregadores,
        String login
) {
    public ClienteDTO {
        if (empregadores == null) {
            empregadores = new ArrayList<>();
        }
    }
}
