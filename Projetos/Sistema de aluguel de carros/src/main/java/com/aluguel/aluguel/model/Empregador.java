package com.aluguel.aluguel.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Empregador {

    @Column(name = "empregador_nome")
    private String nome;

    @Column(name = "empregador_rendimento")
    private BigDecimal rendimento;
}
