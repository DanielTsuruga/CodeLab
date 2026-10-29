import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import TaskFilters from './components/TaskFilters.jsx'
import Stats from './components/Stats.jsx'

/*
  PROJETO DE REFERÊNCIA: gerenciador de tarefas.

  Conceitos demonstrados:
  - componentes e props;
  - useState para guardar dados;
  - eventos de formulário e botões;
  - map() para renderizar listas;
  - filter() para pesquisar/remover/filtrar;
  - useEffect() para salvar no localStorage;
  - useMemo() para calcular a lista visível e estatísticas;
  - renderização condicional.
*/

const STORAGE_KEY = 'taskflow-tarefas-v1'

// Dados iniciais usados apenas quando não há dados salvos no navegador.
const tarefasIniciais = [
  {
    id: 1,
    titulo: 'Revisar componentes React',
    descricao: 'Entender como dividir a interface em componentes.',
    prioridade: 'Alta',
    concluida: false,
    criadaEm: '2026-10-28',
  },
  {
    id: 2,
    titulo: 'Praticar useState',
    descricao: 'Fazer um formulário e atualizar uma lista.',
    prioridade: 'Média',
    concluida: true,
    criadaEm: '2026-10-27',
  },
]

function carregarTarefas() {
  // localStorage só guarda texto, por isso usamos JSON.parse ao recuperar.
  try {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY)
    return dadosSalvos ? JSON.parse(dadosSalvos) : tarefasIniciais
  } catch {
    // Se houver dados inválidos, a aplicação continua com a lista inicial.
    return tarefasIniciais
  }
}

export default function App() {
  // Estado principal: a lista completa de tarefas.
  const [tarefas, setTarefas] = useState(carregarTarefas)

  // Estados controlados dos campos de busca e dos filtros.
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('Todas')
  const [filtroPrioridade, setFiltroPrioridade] = useState('Todas')
  const [mensagem, setMensagem] = useState('')

  // Sempre que tarefas mudar, persistimos a lista no navegador.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas))
  }, [tarefas])

  // useMemo evita recalcular a lista visível sem necessidade.
  // A lógica também poderia ser escrita diretamente no corpo do componente.
  const tarefasVisiveis = useMemo(() => {
    return tarefas.filter((tarefa) => {
      const texto = `${tarefa.titulo} ${tarefa.descricao}`.toLowerCase()
      const combinaBusca = texto.includes(busca.toLowerCase())

      const combinaStatus =
        filtroStatus === 'Todas' ||
        (filtroStatus === 'Concluídas' && tarefa.concluida) ||
        (filtroStatus === 'Pendentes' && !tarefa.concluida)

      const combinaPrioridade =
        filtroPrioridade === 'Todas' ||
        tarefa.prioridade === filtroPrioridade

      return combinaBusca && combinaStatus && combinaPrioridade
    })
  }, [tarefas, busca, filtroStatus, filtroPrioridade])

  // Criar: recebe os dados do formulário e acrescenta uma tarefa ao array.
  function adicionarTarefa(dadosFormulario) {
    const novaTarefa = {
      id: Date.now(), // ID simples para este projeto de estudo.
      ...dadosFormulario,
      concluida: false,
      criadaEm: new Date().toISOString().slice(0, 10),
    }

    setTarefas((listaAtual) => [novaTarefa, ...listaAtual])
    setMensagem('Tarefa adicionada com sucesso!')
    window.setTimeout(() => setMensagem(''), 2500)
  }

  // Atualizar: altera somente a tarefa que possui o ID informado.
  function alternarConclusao(id) {
    setTarefas((listaAtual) =>
      listaAtual.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa,
      ),
    )
  }

  // Excluir: filter cria um novo array sem a tarefa escolhida.
  function removerTarefa(id) {
    const confirmar = window.confirm('Deseja realmente excluir esta tarefa?')
    if (!confirmar) return

    setTarefas((listaAtual) => listaAtual.filter((tarefa) => tarefa.id !== id))
  }

  // Atualização em lote: conclui todas as tarefas pendentes de uma vez.
  function concluirPendentes() {
    setTarefas((listaAtual) =>
      listaAtual.map((tarefa) => ({ ...tarefa, concluida: true })),
    )
  }

  // Limpa os filtros para voltar a exibir todas as tarefas.
  function limparFiltros() {
    setBusca('')
    setFiltroStatus('Todas')
    setFiltroPrioridade('Todas')
  }

  const totalConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length
  const totalPendentes = tarefas.length - totalConcluidas

  return (
    <main className="app-shell">
      <Header />

      <section className="intro">
        <div>
          <p className="eyebrow">SEU ESPAÇO DE ORGANIZAÇÃO</p>
          <h1>Transforme planos em <span>progresso.</span></h1>
          <p className="intro-copy">
            Um projeto de estudo para praticar os fundamentos do React.
          </p>
        </div>
        <div className="date-chip">
          <span className="date-dot" />
          Dados salvos neste navegador
        </div>
      </section>

      <Stats
        total={tarefas.length}
        concluidas={totalConcluidas}
        pendentes={totalPendentes}
      />

      <section className="content-grid">
        <aside className="panel form-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">NOVA ATIVIDADE</p>
              <h2>Adicionar tarefa</h2>
            </div>
            <span className="heading-icon" aria-hidden="true">＋</span>
          </div>
          <TaskForm onAdd={adicionarTarefa} />
          {mensagem && <p className="success-message" role="status">{mensagem}</p>}
          <div className="tip-box">
            <strong>Dica de estudo</strong>
            <p>Observe como o formulário envia dados ao componente pai por meio de uma prop.</p>
          </div>
        </aside>

        <section className="panel list-panel">
          <div className="panel-heading list-heading">
            <div>
              <p className="eyebrow">ACOMPANHAMENTO</p>
              <h2>Suas tarefas <span className="count-badge">{tarefasVisiveis.length}</span></h2>
            </div>
            <button
              className="button button-quiet"
              type="button"
              onClick={concluirPendentes}
              disabled={totalPendentes === 0}
            >
              Concluir pendentes
            </button>
          </div>

          <TaskFilters
            busca={busca}
            onBuscaChange={setBusca}
            status={filtroStatus}
            onStatusChange={setFiltroStatus}
            prioridade={filtroPrioridade}
            onPrioridadeChange={setFiltroPrioridade}
            onClear={limparFiltros}
          />

          <TaskList
            tarefas={tarefasVisiveis}
            onToggle={alternarConclusao}
            onRemove={removerTarefa}
          />
        </section>
      </section>

      <footer className="footer">
        <span>TaskFlow · Projeto de referência React + Vite</span>
        <span>Pratique, modifique e entenda cada função.</span>
      </footer>
    </main>
  )
}