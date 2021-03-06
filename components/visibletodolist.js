import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { getVisibleTodos } from '../reducers'
import * as actions from './actions'
import TodoList from './todolist';


class VisibleTodoList extends Component {
	componentDidMount() {
		this.fetchData()
	}

	componentDidUpdate(prevProps) {
		if(this.props.filter !== prevProps.filter) {
			this.fetchData()
		}
	}

	fetchData() {
		const { filter, fetchTodos } = this.props
		fetchTodos(filter)
	}
	render() {
		const { toggleTodo, ...rest } = this.props
		return <TodoList {...rest} onTodoClick={toggleTodo} />
	}
}

const mapStateToProps = (state, { params }) => {
	const filter = params.filter || 'all'
	return {
		todos: getVisibleTodos(state, filter),
		filter
	}
}

VisibleTodoList = withRouter(connect(
	mapStateToProps,
	actions,
)(VisibleTodoList))

export default VisibleTodoList
