import store from './store'
import React from 'react'
import ReactDOM from 'react-dom'

let nextTodoId = 0
class TodoApp extends React.Component {
	render() {
		return (
			<div>
				<input ref={node => {
					this.input = node
				}} />
				<button onClick={() => {
					store.dispatch({
						type: 'ADD_TODO',
						text: this.input.value,
						id: nextTodoId++
					})
					this.input.value = ''
				}}>
				Add Todo
				</button>
				<ul>
					{this.props.todos.map(todo =>
						<li key={todo.id}
							onClick={() => {
								store.dispatch({
									type: 'TOGGLE_TODO',
									id: todo.id
								})
							}}
							style={{
								textDecoration: todo.completed ?
								'line-through':
								'none'
							}}>
							{todo.text}
						</li>
					)}
				</ul>
			</div>
		)
	}
}
const render = () => {
	ReactDOM.render(
		<TodoApp
			todos={store.getState().todos}/>,
		document.getElementById('app')
	)
}

store.subscribe(render)
render()
