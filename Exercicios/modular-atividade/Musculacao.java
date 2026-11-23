package pm_prova2;

public class Musculacao extends Atividade {

    private int quantidadeAparelhos;

    public Musculacao(String nome, String horario, int duracao, int maxParticipantes, double valor,
                      StatusAtividade status, int quantidadeAparelhos) {
        super(nome, horario, duracao, maxParticipantes, valor, status);
        this.quantidadeAparelhos = quantidadeAparelhos;
    }

    public int getQuantidadeAparelhos() { return quantidadeAparelhos; }

    public void setQuantidadeAparelhos(int quantidadeAparelhos) { this.quantidadeAparelhos = quantidadeAparelhos; }

    @Override
    public void exibirDetalhes() {
        super.exibirDetalhes();
        System.out.println("   Musculacao | Aparelhos: " + quantidadeAparelhos);
    }

    @Override
    public boolean atividadeColetiva() { return false; }
}
