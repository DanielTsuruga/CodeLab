package com.aluguel.aluguel.service;

import com.aluguel.aluguel.dto.ClienteDTO;
import com.aluguel.aluguel.model.Cliente;
import com.aluguel.aluguel.model.Empregador;
import com.aluguel.aluguel.repository.ClienteRepository;
import com.aluguel.aluguel.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;

    public ClienteService(ClienteRepository clienteRepository, UsuarioRepository usuarioRepository) {
        this.clienteRepository = clienteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    public Cliente buscar(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    public Cliente criar(ClienteDTO dto) {
        Cliente cliente = new Cliente();
        aplicar(cliente, dto);
        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(Long id, ClienteDTO dto) {
        Cliente cliente = buscar(id);
        aplicar(cliente, dto);
        return clienteRepository.save(cliente);
    }

    public void deletar(Long id) {
        Cliente cliente = buscar(id);
        clienteRepository.delete(cliente);
    }

    private void aplicar(Cliente cliente, ClienteDTO dto) {
        if (dto.empregadores() != null && dto.empregadores().size() > 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Máximo de 3 empregadores");
        }
        cliente.setRg(dto.rg());
        cliente.setCpf(dto.cpf());
        cliente.setNome(dto.nome());
        cliente.setEndereco(dto.endereco());
        cliente.setProfissao(dto.profissao());
        cliente.setEmpregadores(dto.empregadores() == null ? List.of() : dto.empregadores().stream()
                .map(e -> Empregador.builder().nome(e.nome()).rendimento(e.rendimento()).build())
                .toList());
        if (dto.login() != null && !dto.login().isBlank()) {
            cliente.setUsuario(usuarioRepository.findByLogin(dto.login())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado")));
        }
    }
}
