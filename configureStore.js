import { createStore } from 'redux'
import todoApp from './reducers'

const addLoggingToDispatch = (store) => {
	const rawDispatch = store.dispatch
	if (!console.group) {
		return rawDispatch
	}
	return (action) => {
		console.group(action.type)
		console.log('%c prev state', 'color: gray', store.getState())
		console.log('%c action', 'color: blue',  action)
		const retunValue = rawDispatch(action)
		console.log('%c next state', 'conlor: green', store.getState())
		console.groupEnd(action.type)
		return retunValue
	}
}
const configureStore = () => {

	const store = createStore(todoApp)

	if (process.env.NODE_ENV !== 'production') {
		store.dispatch = addLoggingToDispatch(store)
	}

	return store
}

export default configureStore
