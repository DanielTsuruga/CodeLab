package com.aluguel.aluguel.service;

import com.aluguel.aluguel.enums.StatusPedido;
import com.aluguel.aluguel.model.Automovel;
import com.aluguel.aluguel.model.Cliente;
import com.aluguel.aluguel.model.Pedido;
import com.aluguel.aluguel.repository.AutomovelRepository;
import com.aluguel.aluguel.repository.ClienteRepository;
import com.aluguel.aluguel.repository.PedidoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final AutomovelRepository automovelRepository;

    public PedidoService(PedidoRepository pedidoRepository,
                         ClienteRepository clienteRepository,
                         AutomovelRepository automovelRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.automovelRepository = automovelRepository;
    }

    public Pedido criar(String login, Long automovelId) {
        Cliente cliente = clienteRepository.findByUsuarioLogin(login)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não encontrado para o usuário logado"));
        Automovel automovel = automovelRepository.findById(automovelId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Automóvel não encontrado"));
        Pedido pedido = Pedido.builder()
                .cliente(cliente)
                .automovel(automovel)
                .status(StatusPedido.PENDENTE)
                .build();
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listarDoCliente(String login) {
        return pedidoRepository.findByClienteUsuarioLogin(login);
    }

    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    public Pedido cancelar(Long id, String login) {
        Pedido pedido = buscar(id);
        if (pedido.getCliente().getUsuario() == null
                || !login.equals(pedido.getCliente().getUsuario().getLogin())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Pedido não pertence ao usuário logado");
        }
        if (pedido.getStatus() != StatusPedido.PENDENTE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Só é possível cancelar pedidos pendentes");
        }
        pedido.setStatus(StatusPedido.CANCELADO);
        return pedidoRepository.save(pedido);
    }

    public Pedido avaliar(Long id, boolean aprovado) {
        Pedido pedido = buscar(id);
        if (pedido.getStatus() != StatusPedido.PENDENTE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Só é possível avaliar pedidos pendentes");
        }
        pedido.setStatus(aprovado ? StatusPedido.APROVADO : StatusPedido.REPROVADO);
        return pedidoRepository.save(pedido);
    }

    private Pedido buscar(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
    }
}
