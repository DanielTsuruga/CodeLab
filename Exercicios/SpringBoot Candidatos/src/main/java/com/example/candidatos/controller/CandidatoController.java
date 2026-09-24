package com.example.candidatos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.candidatos.service.CandidatoService;
import com.example.candidatos.model.Candidato;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController 
@RequestMapping("/candidatos")
public class CandidatoController {
    private com.example.candidatos.service.CandidatoService candidatoService;

    public CandidatoController(CandidatoService candidatoService){
        this.candidatoService = candidatoService;
    }

    @GetMapping
    public List<Candidato> listar(){
        return candidatoService.listar();
    }
    @PostMapping
    public Candidato cadastrar(@RequestBody Candidato candidato){
        return candidatoService.cadastrar(candidato);
    }
}
