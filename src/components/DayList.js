import React from 'react'
import DayListItem from './DayListItem'

export default function DayList(props) {
	const { days, setDay } = props
	const parsedDayListItems =
		Array.isArray(days) && days.map(day => <DayListItem key={day.id} {...day} value={props.day} onChange={setDay} />)
	return <ul>{parsedDayListItems}</ul>
}
