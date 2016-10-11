import { v4 } from 'uuid'

const addTodo = (text) => ({
	type: 'ADD_TODO',
	id: v4(),
	text
})

const toggleTodo = (id) => ({
	type:'TOGGLE_TODO',
	id
})

export { addTodo, toggleTodo }
