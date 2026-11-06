package com.aluguel.aluguel.controller;

import com.aluguel.aluguel.dto.RegisterRequest;
import com.aluguel.aluguel.model.Usuario;
import com.aluguel.aluguel.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        if (usuarioRepository.findByLogin(request.login()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Login já cadastrado");
        }
        Usuario usuario = Usuario.builder()
                .login(request.login())
                .senha(passwordEncoder.encode(request.senha()))
                .role(request.role())
                .build();
        usuario = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "id", usuario.getId(),
                "login", usuario.getLogin(),
                "role", usuario.getRole()
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(Authentication authentication) {
        Usuario usuario = usuarioRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
        return ResponseEntity.ok(Map.of(
                "id", usuario.getId(),
                "login", usuario.getLogin(),
                "role", usuario.getRole()
        ));
    }
}
