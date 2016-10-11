import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from './store'
import AddTodo from './components/addtodo'
import VisibleTodoList from './components/visibletodolist'
import Footer from './components/footer'

const TodoApp = () => (
	<div>
		<AddTodo />
		<VisibleTodoList />
		<Footer	/>
	</div>
)

ReactDOM.render(<Provider store={ store }><TodoApp/></Provider>, document.getElementById('app'))
