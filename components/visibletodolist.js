import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { getVisibleTodos } from '../reducers'
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

const mapStateToProps = (state, { params }) => ({
	todos: getVisibleTodos(state, params.filter || 'all')
})

const VisibleTodoList = withRouter(connect(
	mapStateToProps,
	{ onTodoClick: toggleTodo }
)(TodoList))

export default VisibleTodoList
