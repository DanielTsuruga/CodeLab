package pm_prova2;

public class Spinning extends Atividade implements ControladorPresenca {

    private int quantidadeBicicletas;
    private final Frequencia frequencia = new Frequencia();

    public Spinning(String nome, String horario, int duracao, int maxParticipantes, double valor,
                    StatusAtividade status, int quantidadeBicicletas) {
        super(nome, horario, duracao, maxParticipantes, valor, status);
        this.quantidadeBicicletas = quantidadeBicicletas;
    }

    public int getQuantidadeBicicletas() { return quantidadeBicicletas; }

    public void setQuantidadeBicicletas(int quantidadeBicicletas) { this.quantidadeBicicletas = quantidadeBicicletas; }

    @Override
    public void registrarPresenca(String nomeParticipante) {
        frequencia.registrar(nomeParticipante,
                Math.min(getQuantidadeMaximaParticipantes(), quantidadeBicicletas), getNome());
    }

    @Override
    public void exibirDetalhes() {
        super.exibirDetalhes();
        System.out.println("   Spinning | Bicicletas: " + quantidadeBicicletas + " | Presencas: " + frequencia.total());
    }

    @Override
    public boolean atividadeColetiva() { return true; }
}
