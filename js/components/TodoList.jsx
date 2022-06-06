const TodoList = (props) => {

const Todo =  props.todos.map(td => (
            <TodoItem
            key={td.id}
            contents={td.contents}
            />
))

return  <ul id="todos">{Todo}</ul>
}