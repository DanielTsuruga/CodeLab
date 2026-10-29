# TaskFlow — projeto de referência para estudar React

Aplicação de lista de tarefas feita com **React + Vite**, com comentários em português para servir como material de consulta e estudo.

## Como executar

É necessário ter Node.js e npm instalados.

```bash
npm install
npm run dev
```

Abra no navegador o endereço que o Vite mostrar no terminal (normalmente `http://localhost:5173`).

Para verificar se a aplicação compila para produção:

```bash
npm run build
```

## Funcionalidades

- Criar tarefas com título, descrição e prioridade.
- Marcar tarefas como concluídas ou pendentes.
- Excluir tarefas com confirmação.
- Pesquisar por título ou descrição.
- Filtrar por status e prioridade.
- Exibir totais de tarefas, pendentes e concluídas.
- Salvar os dados no `localStorage` do navegador.
- Layout responsivo para celular e computador.

## Estrutura dos arquivos

```text
react-estudos-prova/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    └── components/
        ├── Header.jsx
        ├── Stats.jsx
        ├── TaskForm.jsx
        ├── TaskFilters.jsx
        └── TaskList.jsx
```

### O que estudar em cada arquivo

- `main.jsx`: como o React é conectado ao HTML.
- `App.jsx`: estado principal, funções CRUD, filtros, `useEffect` e `useMemo`.
- `components/TaskForm.jsx`: inputs controlados, `onChange`, `onSubmit` e validação.
- `components/TaskList.jsx`: `map`, `key`, props, renderização condicional e `filter` (a remoção é controlada pelo pai).
- `components/TaskFilters.jsx`: componentes controlados e passagem de funções por props.
- `components/Stats.jsx`: receber dados por props e calcular porcentagem.
- `styles.css`: layout, classes, estados visuais e media queries.
- `package.json`: dependências e scripts npm.

## Conceitos importantes

### `useState`

Guarda dados que podem mudar e cuja mudança deve atualizar a interface.

```jsx
const [contador, setContador] = useState(0)
setContador((valorAtual) => valorAtual + 1)
```

### Props

Permitem que um componente pai passe dados ou funções para um componente filho.

```jsx
<Stats total={tarefas.length} />
```

### Renderizar arrays com `map`

```jsx
{tarefas.map((tarefa) => (
  <li key={tarefa.id}>{tarefa.titulo}</li>
))}
```

### Remover com `filter`

```jsx
setTarefas((listaAtual) =>
  listaAtual.filter((tarefa) => tarefa.id !== id)
)
```

### Formulário

`event.preventDefault()` impede o recarregamento padrão do navegador quando o formulário é enviado.

### `useEffect` e `localStorage`

O efeito grava as tarefas sempre que o estado `tarefas` muda. O `localStorage` é armazenamento local do navegador; não é um banco de dados compartilhado nem uma API.

## Exercícios para praticar

Tente implementar sem olhar a solução imediatamente:

1. Adicionar um botão para apagar todas as tarefas concluídas.
2. Mostrar uma mensagem diferente quando todas as tarefas estiverem concluídas.
3. Adicionar um filtro para mostrar apenas tarefas de prioridade alta.
4. Impedir que duas tarefas com o mesmo título sejam cadastradas.
5. Adicionar um contador de caracteres na descrição.
6. Ordenar as tarefas por prioridade.
7. Separar a confirmação de exclusão em um componente próprio.
8. Alterar as cores e o layout sem mexer na lógica.
9. Criar uma nova categoria chamada “Disciplina”.
10. Explicar em voz alta como `App` passa funções para `TaskForm` e `TaskList`.

## Observações

- Os comentários são didáticos; em projetos reais, prefira comentários que expliquem decisões ou lógica não óbvia.
- Este projeto usa `localStorage`, não servidor nem banco de dados.
- O ID com `Date.now()` é suficiente para este exercício local, mas aplicações reais podem usar IDs gerados pelo backend ou `crypto.randomUUID()`.
- Use o projeto como referência para aprender e adaptar os padrões ao enunciado, não apenas como código para copiar.
