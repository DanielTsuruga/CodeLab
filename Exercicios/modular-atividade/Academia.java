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
