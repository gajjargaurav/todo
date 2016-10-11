import React from 'react'
import { withRouter } from 'react-router'
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
		case 'all':
			return todos
		case 'completed':
			return todos.filter(t => t.completed)
		case 'active':
			return todos.filter(t => !t.completed)
		default:
			throw new Error(`Unknow filter: ${filter}.`)
	}
}

const mapStateToProps = (state, { params }) => ({
	todos: getVisibleTodos(state.todos, params.filter || 'all')
})
const mapDispatchToProps = (dispatch) => ({
	onTodoClick: (id) => dispatch(toggleTodo(id))
})
const VisibleTodoList = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList))

export default VisibleTodoList
