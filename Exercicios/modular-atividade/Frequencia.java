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
