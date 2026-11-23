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
