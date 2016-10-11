import React from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from './action-creators'

const Footer = () => (
	<p>
		Show: {' '}
		<FilterLink
			filter='SHOW_ALL'
		>
			All
		</FilterLink>
		{' '}
		<FilterLink
			filter='SHOW_ACTIVE'
		>
			Active
		</FilterLink>
		{' '}
		<FilterLink
			filter='SHOW_COMPLETED'
		>
			Completed
		</FilterLink>
	</p>
)

const Link = ({active, children, onClick}) => {
	if (active) {
		return <span>{children}</span>
	}
	return (
		<a href='#' onClick={e => {
			e.preventDefault()
			onClick()
		}}>
			{children}
		</a>
	)
}

const mapStateToProps = (
	state,
	ownProps
) => ({
	active:
		ownProps.filter ===
		state.visibilityFilter
})
const mapDispatchToProps = (
	dispatch,
	ownProps
) => ({
	onClick() {
		dispatch(setVisibilityFilter(ownProps.filter))
	}
})
const  FilterLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(Link)

export default Footer
