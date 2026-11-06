package com.aluguel.aluguel.repository;

import com.aluguel.aluguel.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByClienteUsuarioLogin(String login);
}
