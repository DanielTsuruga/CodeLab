package pm_prova2;

public enum StatusPlano {
    ATIVO,
    SUSPENSO,
    CANCELADO
    
}

package pm_prova2;

public enum StatusAtividade {
    ATIVA,
    LOTADA,
    INATIVA
    
}

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

package pm_prova2;

public class PlanoPremium extends Plano {

    public PlanoPremium(String nome, double valor, int maxAtividades, StatusPlano status) {
        super(nome, valor, maxAtividades, status);
    }

    @Override
    public boolean permiteAtividadeColetiva() { return true; }

    @Override
    public void exibirDetalhes() {
        super.exibirDetalhes();
        System.out.println("   Premium | Qualquer atividade | Acesso ilimitado");
    }
}

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

package pm_prova2;

import java.util.List;
import java.util.Scanner;

public class Main {

    private static final Scanner entrada = new Scanner(System.in);

    public static void main(String[] args) {
        Academia academia = new Academia();
        carregarDadosIniciais(academia);
        int opcao;
        do {
            System.out.println("\n===== ACADEMIA =====\n1 - Associar atividade a um plano\n2 - Exibir atividades"
                    + "\n3 - Exibir planos\n4 - Exibir planos ativos\n5 - Emitir certificado"
                    + "\n6 - Registrar presenca em atividade\n7 - Remover atividades inativas\n0 - Sair");
            opcao = lerInt("Opcao: ");
            switch (opcao) {
                case 1: associar(academia); break;
                case 2: academia.getAtividades().forEach(Atividade::exibirDetalhes); break;
                case 3: academia.getPlanos().forEach(Plano::exibirDetalhes); break;
                case 4: academia.getPlanosAtivos().forEach(Plano::exibirDetalhes); break;
                case 5: emitirCertificado(academia); break;
                case 6: registrarPresenca(academia); break;
                case 7: System.out.println(academia.removerAtividadesInativas() + " atividade(s) removida(s)."); break;
                case 0: System.out.println("Encerrando..."); break;
                default: System.out.println("Opcao invalida.");
            }
        } while (opcao != 0);
    }

    private static void carregarDadosIniciais(Academia academia) {
        academia.adicionar(new Musculacao("Musculacao", "07:00", 60, 30, 90.0, StatusAtividade.ATIVA, 25));
        academia.adicionar(new Natacao("Natacao", "18:00", 45, 15, 120.0, StatusAtividade.ATIVA, 1.8, true));
        academia.adicionar(new Spinning("Spinning", "19:00", 50, 20, 100.0, StatusAtividade.ATIVA, 20));
        academia.adicionar(new PlanoBasico("Basico", 99.9, 2, StatusPlano.ATIVO));
        academia.adicionar(new PlanoPremium("Premium", 199.9, 10, StatusPlano.ATIVO));
    }

    private static void associar(Academia academia) {
        Plano plano = escolherPlano(academia.getPlanos());
        Atividade atividade = escolherAtividade(academia.getAtividades());
        if (plano != null && atividade != null) {
            String erro = plano.associarAtividade(atividade);
            System.out.println(erro == null ? "Atividade associada com sucesso." : "Nao foi possivel: " + erro);
        }
    }

    private static void emitirCertificado(Academia academia) {
        Atividade a = escolherAtividade(academia.atividadesCom(Certificavel.class));
        if (a != null) {
            ((Certificavel) a).emitirCertificado(lerTexto("Nome do participante: "));
        }
    }

    private static void registrarPresenca(Academia academia) {
        Atividade a = escolherAtividade(academia.atividadesCom(ControladorPresenca.class));
        if (a != null) {
            ((ControladorPresenca) a).registrarPresenca(lerTexto("Nome do participante: "));
        }
    }

    private static Atividade escolherAtividade(List<Atividade> lista) {
        for (int i = 0; i < lista.size(); i++) {
            System.out.println((i + 1) + " - " + lista.get(i).getNome() + " (" + lista.get(i).getStatus() + ")");
        }
        return escolher(lista, "atividade");
    }

    private static Plano escolherPlano(List<Plano> lista) {
        for (int i = 0; i < lista.size(); i++) {
            System.out.println((i + 1) + " - " + lista.get(i).getNome());
        }
        return escolher(lista, "plano");
    }

    private static <T> T escolher(List<T> lista, String tipo) {
        if (lista.isEmpty()) {
            System.out.println("Nenhum(a) " + tipo + " disponivel.");
            return null;
        }
        int i = lerInt("Escolha o(a) " + tipo + ": ") - 1;
        if (i < 0 || i >= lista.size()) {
            System.out.println("Opcao invalida.");
            return null;
        }
        return lista.get(i);
    }

    private static int lerInt(String msg) {
        while (true) {
            try {
                return Integer.parseInt(lerTexto(msg));
            } catch (NumberFormatException e) {
                System.out.println("Digite um numero valido.");
            }
        }
    }

    private static String lerTexto(String msg) {
        System.out.print(msg);
        return entrada.nextLine().trim();
    }
}

package pm_prova2;

import java.util.ArrayList;
import java.util.List;

public class Frequencia {

    private final List<String> nomes = new ArrayList<>();

    public void registrar(String nome, int limite, String atividade) {
        if (nomes.contains(nome)) {
            System.out.println(nome + " ja teve a presenca registrada.");
        } else if (nomes.size() >= limite) {
            System.out.println("Turma cheia (limite de " + limite + ").");
        } else {
            nomes.add(nome);
            System.out.println("Presenca de " + nome + " registrada em " + atividade + ".");
        }
    }

    public int total() {
        return nomes.size();
    }
}

package pm_prova2;

public interface ControladorPresenca {

    void registrarPresenca(String nomeParticipante);
}

package pm_prova2;

public interface Certificavel {

    void emitirCertificado(String nomeParticipante);
}

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
   
package pm_prova2;

import java.util.ArrayList;
import java.util.List;

public class Academia {

    private final List<Atividade> atividades = new ArrayList<>();
    private final List<Plano> planos = new ArrayList<>();

    public void adicionar(Atividade atividade) { atividades.add(atividade); }

    public void adicionar(Plano plano) { planos.add(plano); }

    public List<Atividade> getAtividades() { return atividades; }

    public List<Plano> getPlanos() { return planos; }

    public List<Plano> getPlanosAtivos() {
        List<Plano> ativos = new ArrayList<>(planos);
        ativos.removeIf(p -> p.getStatus() != StatusPlano.ATIVO);
        return ativos;
    }

    public List<Atividade> atividadesCom(Class<?> interfaceAlvo) {
        List<Atividade> lista = new ArrayList<>(atividades);
        lista.removeIf(a -> !interfaceAlvo.isInstance(a));
        return lista;
    }

    public int removerAtividadesInativas() {
        int antes = atividades.size();
        atividades.removeIf(a -> a.getStatus() == StatusAtividade.INATIVA);
        planos.forEach(Plano::removerAtividadesInativas);
        return antes - atividades.size();
    }
}
