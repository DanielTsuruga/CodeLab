package com.example.candidatos_thymeleaf.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.candidatos_thymeleaf.model.Candidato;
import com.example.candidatos_thymeleaf.service.CandidatoService;

@Controller
@RequestMapping("/candidatos")
public class CandidatoController {

    private CandidatoService candidatoService;

    public CandidatoController(CandidatoService candidatoService) {
        this.candidatoService = candidatoService;
    }

    @GetMapping
    public String listar(Model model) {

        // Envia a lista de candidatos para o Thymeleaf
        model.addAttribute("candidatos", candidatoService.listar());

        // Retorna o nome do arquivo HTML dentro de templates
        return "candidatos";
    }

    @GetMapping("/filtro")
    public String filtrar(
            @RequestParam String busca,
            Model model) {

        List<Candidato> candidatos = candidatoService.listar();

        List<Candidato> resultado = new ArrayList<>();

        // Percorre todos os candidatos procurando uma correspondência
        for (Candidato candidato : candidatos) {

            if (candidato.getNome().toLowerCase().contains(busca.toLowerCase())
                    || candidato.getCargo().toLowerCase().contains(busca.toLowerCase())) {

                resultado.add(candidato);
            }
        }

        // Envia somente os candidatos encontrados para o HTML
        model.addAttribute("candidatos", resultado);

        return "candidatos";
    }
}