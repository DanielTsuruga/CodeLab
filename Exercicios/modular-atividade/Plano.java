package pm_prova2;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public abstract class Plano {

    private String nome;
    private double valorMensal;
    private int quantidadeMaximaAtividades;
    private StatusPlano status;
    private final List<Atividade> atividades = new ArrayList<>();

    public Plano(String nome,
                 double valorMensal,
                 int quantidadeMaximaAtividades,
                 StatusPlano status) {

        this.nome = nome;
        this.valorMensal = valorMensal;
        this.quantidadeMaximaAtividades = quantidadeMaximaAtividades;
        this.status = status;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getValorMensal() {
        return valorMensal;
    }

    public void setValorMensal(double valorMensal) {
        this.valorMensal = valorMensal;
    }

    public int getQuantidadeMaximaAtividades() {
        return quantidadeMaximaAtividades;
    }

    public void setQuantidadeMaximaAtividades(int quantidadeMaximaAtividades) {
        this.quantidadeMaximaAtividades = quantidadeMaximaAtividades;
    }

    public StatusPlano getStatus() {
        return status;
    }

    public void setStatus(StatusPlano status) {
        this.status = status;
    }

    public List<Atividade> getAtividades() {
        return Collections.unmodifiableList(atividades);
    }

    public String associarAtividade(Atividade atividade) {
        if (status != StatusPlano.ATIVO) return "Plano nao esta ativo.";
        if (atividade.getStatus() == StatusAtividade.INATIVA) return "Atividade inativa.";
        if (atividades.contains(atividade)) return "Atividade ja associada.";
        if (atividades.size() >= quantidadeMaximaAtividades) return "Limite de atividades atingido.";
        if (atividade.atividadeColetiva() && !permiteAtividadeColetiva()) return "Plano nao permite atividades coletivas.";
        atividades.add(atividade);
        return null;
    }

    public void removerAtividadesInativas() {
        atividades.removeIf(a -> a.getStatus() == StatusAtividade.INATIVA);
    }

    public void exibirDetalhes() {
        System.out.println("Plano: " + nome + " | Mensal: R$ " + String.format("%.2f", valorMensal)
                + " | Max. atividades: " + quantidadeMaximaAtividades + " | Status: " + status);
        atividades.forEach(a -> System.out.println("   - " + a.getNome()));
    }

    public abstract boolean permiteAtividadeColetiva();
}
   
