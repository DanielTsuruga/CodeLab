package pm_prova2;

public abstract class Atividade {

    private String nome;
    private int duracaoAula;
    private int quantidadeMaximaParticipantes;
    private double valorMensal;
    private StatusAtividade status;
    private String horario;

    public Atividade(String nome,
                     int duracaoAula,
                     int quantidadeMaximaParticipantes,
                     double valorMensal,
                     StatusAtividade status) {

        this.nome = nome;
        this.duracaoAula = duracaoAula;
        this.quantidadeMaximaParticipantes = quantidadeMaximaParticipantes;
        this.valorMensal = valorMensal;
        this.status = status;
        this.horario = "";
    }

    public Atividade(String nome,
                     String horario,
                     int duracaoAula,
                     int quantidadeMaximaParticipantes,
                     double valorMensal,
                     StatusAtividade status) {
        this(nome, duracaoAula, quantidadeMaximaParticipantes, valorMensal, status);
        this.horario = horario;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getDuracaoAula() {
        return duracaoAula;
    }

    public void setDuracaoAula(int duracaoAula) {
        this.duracaoAula = duracaoAula;
    }

    public int getQuantidadeMaximaParticipantes() {
        return quantidadeMaximaParticipantes;
    }

    public void setQuantidadeMaximaParticipantes(int quantidadeMaximaParticipantes) {
        this.quantidadeMaximaParticipantes = quantidadeMaximaParticipantes;
    }

    public double getValorMensal() {
        return valorMensal;
    }

    public void setValorMensal(double valorMensal) {
        this.valorMensal = valorMensal;
    }

    public StatusAtividade getStatus() {
        return status;
    }

    public void setStatus(StatusAtividade status) {
        this.status = status;
    }

    public void exibirDetalhes() {
        System.out.println("Atividade: " + nome + " | Horario: " + horario
                + " | Duracao: " + duracaoAula + " min | Max. participantes: "
                + quantidadeMaximaParticipantes + " | Mensal: R$ " + String.format("%.2f", valorMensal)
                + " | Status: " + status);
    }

    public abstract boolean atividadeColetiva();
}
   
