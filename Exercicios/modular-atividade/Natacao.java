package pm_prova2;

public class Natacao extends Atividade implements Certificavel, ControladorPresenca {

    private double profundidadePiscina;
    private boolean oferecerCertificado;
    private final Frequencia frequencia = new Frequencia();

    public Natacao(String nome, String horario, int duracao, int maxParticipantes, double valor,
                   StatusAtividade status, double profundidadePiscina, boolean oferecerCertificado) {
        super(nome, horario, duracao, maxParticipantes, valor, status);
        this.profundidadePiscina = profundidadePiscina;
        this.oferecerCertificado = oferecerCertificado;
    }

    public double getProfundidadePiscina() { return profundidadePiscina; }

    public void setProfundidadePiscina(double profundidadePiscina) { this.profundidadePiscina = profundidadePiscina; }

    public boolean isOferecerCertificado() { return oferecerCertificado; }

    public void setOferecerCertificado(boolean oferecerCertificado) { this.oferecerCertificado = oferecerCertificado; }

    @Override
    public void emitirCertificado(String nomeParticipante) {
        if (oferecerCertificado) {
            System.out.println("=== CERTIFICADO ===\nCertificamos que " + nomeParticipante
                    + " participou da atividade " + getNome() + ".");
        } else {
            System.out.println("Esta turma nao oferece certificado.");
        }
    }

    @Override
    public void registrarPresenca(String nomeParticipante) {
        frequencia.registrar(nomeParticipante, getQuantidadeMaximaParticipantes(), getNome());
    }

    @Override
    public void exibirDetalhes() {
        super.exibirDetalhes();
        System.out.println("   Natacao | Profundidade: " + profundidadePiscina + " m | Certificado: "
                + (oferecerCertificado ? "sim" : "nao") + " | Presencas: " + frequencia.total());
    }

    @Override
    public boolean atividadeColetiva() { return true; }
}
