package com.example.candidatos.service;

import java.util.List;
import java.util.ArrayList;

import com.example.candidatos.model.Candidato;

import org.springframework.stereotype.Service;

@Service
public class CandidatoService {

    private List<Candidato> candidatos = new ArrayList<>();

    public CandidatoService() {
        candidatos.add(new Candidato(1L, "João", "Desenvolvedor Java", 21));
        candidatos.add(new Candidato(2L, "Maria", "Desenvolvedora Front-end", 23));
        candidatos.add(new Candidato(3L, "Pedro", "Analista de Sistemas", 25));
        candidatos.add(new Candidato(4L, "Ana", "Desenvolvedora Java", 22));
    }

    public List<Candidato> listar() {
        return candidatos;
    }
    public Candidato cadastrar(Candidato candidato){
        candidatos.add(candidato);
        return candidato;
    }
}