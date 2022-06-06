const TodoItem = (todos) => {
    return (
        <li key={todos.id}>
            {todos.contents}
        </li>
    )
}