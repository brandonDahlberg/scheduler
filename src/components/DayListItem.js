import React from 'react'
import 'components/DayListItem.scss'
import classNames from 'classnames'

export default function DayListItem(props) {
	const spots = props.spots
	const dayClass = classNames('day-list__item', {
		'day-list__item--selected': props.selected,
		'day-list__item--full': spots === 0,
	})
	const formatSpots = spots => {
		if (!spots) {
			return `no spots remaining`
		} else if (spots === 1) {
			return `${spots} spot remaining`
		} else return `${spots} spots remaining`
	}
	const formattedSpots = formatSpots(spots)
	return (
		<li className={dayClass} onClick={() => props.setDay(props.value)} selected={props.name === props.value}>
			<h2 className='text--regular'>{props.name}</h2>
			<h3 className='text--light'>{formattedSpots}</h3>
		</li>
	)
}
