import React from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from './actions'
import FilterLink from './FilterLink'

const Footer = () => (
	<p>
		Show: {' '}
		<FilterLink
			filter='all'
		>
			All
		</FilterLink>
		{' '}
		<FilterLink
			filter='active'
		>
			Active
		</FilterLink>
		{' '}
		<FilterLink
			filter='completed'
		>
			Completed
		</FilterLink>
	</p>
)

export default Footer
