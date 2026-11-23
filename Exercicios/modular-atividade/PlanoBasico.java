package pm_prova2;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

public class PlanoBasico extends Plano implements ControladorPresenca {

    private final Map<String, LocalDate> ultimosAcessos = new HashMap<>();

    public PlanoBasico(String nome, double valor, int maxAtividades, StatusPlano status) {
        super(nome, valor, maxAtividades, status);
    }

    @Override
    public void registrarPresenca(String nomeParticipante) {
        LocalDate hoje = LocalDate.now();
        if (getStatus() != StatusPlano.ATIVO) {
            System.out.println("Plano nao esta ativo: acesso negado.");
        } else if (hoje.equals(ultimosAcessos.put(nomeParticipante, hoje))) {
            System.out.println("Acesso negado: o plano basico permite 1 acesso por dia.");
        } else {
            System.out.println("Acesso de " + nomeParticipante + " registrado em " + hoje + ".");
        }
    }

    @Override
    public boolean permiteAtividadeColetiva() { return false; }

    @Override
    public void exibirDetalhes() {
        super.exibirDetalhes();
        System.out.println("   Basico | Apenas individuais | 1 acesso/dia");
    }
}
