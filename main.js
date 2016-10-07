import store from './store'
import React from 'react'
import ReactDOM from 'react-dom'

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

const AddTodo = ({
	onAddClick
}) => {
	let input
	return (
		<div>
			<input ref={node => {
				input = node
			}}/>
			<button onClick={() => {
				onAddClick(input.value)
				input.value = ''
			}}>
				Add Todo
			</button>
		</div>
	)
}

const Footer = ({visibilityFilter, onFilterClick}) => (
	<p>
		Show: {' '}
		<FilterLink
			filter='SHOW_ALL'
			currentFilter={visibilityFilter}
			onClick={onFilterClick}
		>
			All
		</FilterLink>
		{' '}
		<FilterLink
			filter='SHOW_ACTIVE'
			currentFilter={visibilityFilter}
			onClick={onFilterClick}
		>
			Active
		</FilterLink>
		{' '}
		<FilterLink
			filter='SHOW_COMPLETED'
			currentFilter={visibilityFilter}
			onClick={onFilterClick}
		>
			Completed
		</FilterLink>
	</p>
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

const FilterLink = ({filter, currentFilter, children, onClick}) => {
	if (filter === currentFilter) {
		return <span>{children}</span>
	}
	return (
		<a href='#' onClick={e => {
			e.preventDefault()
			onClick(filter)
		}}>
			{children}
		</a>
	)
}

let nextTodoId = 0
const TodoApp = ({
	todos,
	visibilityFilter
}) => (
	<div>
		<AddTodo
			onAddClick={text =>
				store.dispatch({
					type: 'ADD_TODO',
					id: nextTodoId++,
					text
				})}
		/>
		<TodoList
			todos={getVisibleTodos(todos, visibilityFilter)}
			onTodoClick={id =>
				store.dispatch({
					type: 'TOGGLE_TODO',
					id
				})}
		/>
		<Footer
			visibilityFilter={visibilityFilter}
			onFilterClick={filter =>
				store.dispatch({
					type: 'SET_VISIBILITY_FILTER',
					filter
				})}
		/>
	</div>
)

const render = () => {
	ReactDOM.render(
		<TodoApp {...store.getState()}/>, document.getElementById('app'))
}

store.subscribe(render)
render()
