import React from 'react'
import AddTodo from './addtodo'
import VisibleTodoList from './visibletodolist'
import Footer from './footer'

const App = ({ params }) => (
	<div>
		<AddTodo />
		<VisibleTodoList
			filter={params.filter || 'all'}/>
		<Footer	/>
	</div>
)

export default App
