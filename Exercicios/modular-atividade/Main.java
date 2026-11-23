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
