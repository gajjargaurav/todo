const byId = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_TODOS':
			const nextSate = { ...state }
			action.response.forEach(todo => {
				nextSate[todo.id] = todo
			})
			return nextSate
		default:
			return state
	}
}

export default byId

export const getTodo = (state, id) => state[id]
