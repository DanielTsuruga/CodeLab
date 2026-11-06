package com.aluguel.aluguel.controller;

import com.aluguel.aluguel.dto.PedidoRequest;
import com.aluguel.aluguel.model.Pedido;
import com.aluguel.aluguel.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<Pedido> criar(@Valid @RequestBody PedidoRequest request, Authentication auth) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pedidoService.criar(auth.getName(), request.automovelId()));
    }

    @GetMapping
    public List<Pedido> listar(Authentication auth) {
        boolean agente = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_AGENTE"));
        return agente ? pedidoService.listarTodos() : pedidoService.listarDoCliente(auth.getName());
    }

    @PutMapping("/{id}/cancelar")
    @PreAuthorize("hasRole('CLIENTE')")
    public Pedido cancelar(@PathVariable Long id, Authentication auth) {
        return pedidoService.cancelar(id, auth.getName());
    }

    @PutMapping("/{id}/avaliar")
    @PreAuthorize("hasRole('AGENTE')")
    public Pedido avaliar(@PathVariable Long id, @RequestParam boolean aprovado) {
        return pedidoService.avaliar(id, aprovado);
    }
}
