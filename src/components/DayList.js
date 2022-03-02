import React from 'react'
import DayListItem from './DayListItem'

export default function DayList(props) {
	const { day: selectedDay, days, setDay } = props
	const parsedDayListItems = days.map(day => (
		<DayListItem key={day.id} {...day} value={day.name} setDay={setDay} selected={selectedDay === day.name} />
	))
	return <ul>{parsedDayListItems}</ul>
}
