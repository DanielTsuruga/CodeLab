package com.example.candidatos_thymeleaf.model;

public class Candidato {

    private Long id;
    private String nome;
    private String cargo;
    private int idade;

    public Candidato(Long id, String nome, String cargo, int idade) {
        this.id = id;
        this.nome = nome;
        this.cargo = cargo;
        this.idade = idade;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCargo() {
        return cargo;
    }

    public int getIdade() {
        return idade;
    }
}