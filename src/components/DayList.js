import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
	const { days, setDay } = props
  const parsedDayListItems = Array.isArray(days) && days.map(day =>  <DayListItem key={day.id} {...day} day={props.day} setDay={setDay}/>);
	return (
  <ul>{parsedDayListItems}</ul>
  );
}
