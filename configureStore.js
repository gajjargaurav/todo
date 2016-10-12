import { createStore } from 'redux'
import throttle from 'lodash/throttle'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'

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

	const persistedState = loadState()
	const store = createStore(todoApp, persistedState)

	if (process.env.NODE_ENV !== 'production') {
		store.dispatch = addLoggingToDispatch(store)
	}

	store.subscribe(throttle(() => {
		saveState({
			todos: store.getState().todos
		})
	}, 1000))

	return store
}

export default configureStore
