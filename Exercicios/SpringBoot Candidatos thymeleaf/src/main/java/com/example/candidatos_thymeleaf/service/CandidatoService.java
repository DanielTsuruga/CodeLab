package com.example.candidatos_thymeleaf.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.candidatos_thymeleaf.model.Candidato;

@Service
public class CandidatoService {

    private List<Candidato> candidatos = new ArrayList<>();

    public CandidatoService() {

        candidatos.add(
            new Candidato(1L, "João", "Desenvolvedor Java", 21)
        );

        candidatos.add(
            new Candidato(2L, "Maria", "Desenvolvedora Front-end", 23)
        );

        candidatos.add(
            new Candidato(3L, "Pedro", "Analista de Sistemas", 25)
        );

        candidatos.add(
            new Candidato(4L, "Ana", "Desenvolvedora Java", 22)
        );
    }

    public List<Candidato> listar() {
        return candidatos;
    }
}