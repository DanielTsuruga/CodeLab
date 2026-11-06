package com.aluguel.aluguel.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String rg;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private String nome;

    private String endereco;

    private String profissao;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "cliente_empregador",
            joinColumns = @JoinColumn(name = "cliente_id")
    )
    @Builder.Default
    private List<Empregador> empregadores = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;
}
