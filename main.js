import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from './store'
import AddTodo from './addtodo'
import VisibleTodoList from './visibletodolist'
import Footer from './footer'

const TodoApp = () => (
	<div>
		<AddTodo />
		<VisibleTodoList />
		<Footer	/>
	</div>
)

ReactDOM.render(<Provider store={ store }><TodoApp/></Provider>, document.getElementById('app'))
