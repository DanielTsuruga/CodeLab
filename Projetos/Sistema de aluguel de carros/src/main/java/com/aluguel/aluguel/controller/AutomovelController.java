package com.aluguel.aluguel.controller;

import com.aluguel.aluguel.model.Automovel;
import com.aluguel.aluguel.repository.AutomovelRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/automoveis")
public class AutomovelController {

    private final AutomovelRepository automovelRepository;

    public AutomovelController(AutomovelRepository automovelRepository) {
        this.automovelRepository = automovelRepository;
    }

    @GetMapping
    public List<Automovel> listar() {
        return automovelRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Automovel> criar(@RequestBody Automovel automovel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(automovelRepository.save(automovel));
    }
}
