import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from './action-creators'

const Todo = ({onClick, completed, text}) => (
	<li
		onClick={onClick} style={{
			textDecoration: completed
			? 'line-through'
			: 'none'
		}}>
		{text}
	</li>
)

const TodoList = ({todos, onTodoClick}) => (
	<ul>
		{todos.map(todo =>
			<Todo
				key={todo.id}
				{...todo}
				onClick={() => onTodoClick(todo.id)}
			/>
		)}
	</ul>
)

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed)
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed)
		default:
			return todos
	}
}

const mapStateToProps = (state) => ({
	todos: getVisibleTodos(
	state.todos,
	state.visibilityFilter
	)
})
const mapDispatchToProps = (dispatch) => ({
	onTodoClick: (id) => dispatch(toggleTodo(id))
})
const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList)

export default VisibleTodoList
