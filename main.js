import store from './store'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'

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

const AddTodo = (props, { store }) => {
	let input
	return (
		<div>
			<input ref={node => {
				input = node
			}}/>
			<button onClick={() => {
				store.dispatch({
					type: 'ADD_TODO',
					id: nextTodoId++,
					text: input.value
				})
				input.value = ''
			}}>
				Add Todo
			</button>
		</div>
	)
}
AddTodo.contextTypes = {
	store: React.PropTypes.object
}
const Footer = () => (
	<p>
		Show: {' '}
		<FilterLink
			filter='SHOW_ALL'
		>
			All
		</FilterLink>
		{' '}
		<FilterLink
			filter='SHOW_ACTIVE'
		>
			Active
		</FilterLink>
		{' '}
		<FilterLink
			filter='SHOW_COMPLETED'
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

const Link = ({active, children, onClick}) => {
	if (active) {
		return <span>{children}</span>
	}
	return (
		<a href='#' onClick={e => {
			e.preventDefault()
			onClick()
		}}>
			{children}
		</a>
	)
}

class FilterLink extends React.Component {
	componentDidMount() {
		const { store } = this.context
		this.unsubscribe = store.subscribe(() =>
			this.forceUpdate()
		)
	}

	componentWillUnmount() {
		this.unsubscribe()
	}

	render() {
		const props = this.props
		const { store } = this.context
		const state = store.getState()

		return (
			<Link
				active={
					props.filter ===
					state.visibilityFilter
				}
				onClick={() =>
					store.dispatch({
						type:'SET_VISIBILITY_FILTER',
						filter: props.filter
					})}
			>
				{props.children}
			</Link>
		)
	}
}
FilterLink.contextTypes = {
	store: React.PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		todos: getVisibleTodos(
		state.todos,
		state.visibilityFilter
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTodoClick: (id) =>
			dispatch({
				type:'TOGGLE_TODO',
				id
			})
	}
}

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList)

let nextTodoId = 0
const TodoApp = () => (
	<div>
		<AddTodo />
		<VisibleTodoList />
		<Footer	/>
	</div>
)

ReactDOM.render(<Provider store={ store }><TodoApp/></Provider>, document.getElementById('app'))
