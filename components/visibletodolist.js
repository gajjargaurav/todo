import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { getVisibleTodos } from '../reducers'
import { toggleTodo } from './action-creators'
import TodoList from './todolist';

const mapStateToProps = (state, { params }) => ({
	todos: getVisibleTodos(state, params.filter || 'all')
})

const VisibleTodoList = withRouter(connect(
	mapStateToProps,
	{ onTodoClick: toggleTodo }
)(TodoList))

export default VisibleTodoList
