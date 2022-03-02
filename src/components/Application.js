import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import DayList from './DayList'
import 'components/Application.scss'
import Appointment from 'components/Appointment/index'
import { getAppointmentsForDay, getInterview } from 'helpers/selectors'

export default function Application() {
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	})
	useEffect(() => {
		Promise.all([
			axios.get('http://localhost:8001/api/days'),
			axios.get('http://localhost:8001/api/appointments'),
			axios.get('http://localhost:8001/api/interviewers'),
		]).then(response => {
			setState(prev => ({
				...prev,
				days: response[0].data,
				appointments: response[1].data,
				interviewers: response[2].data,
			}))
		})
	}, [])
	const setDay = day => setState({ ...state, day })
	const bookInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		}
		console.log('appointment', appointment)
		const appointments = {
			...state.appointments,
			[id]: appointment,
		}
		console.log('appointments', appointments)

		return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then(response => {
			console.log('response.body: ', response.body)
			setState({
				...state,
				appointments,
			})
		})
	}
	const cancelInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		}
		console.log('appointment', appointment)
		const appointments = {
			...state.appointments,
			[id]: appointment,
		}
		console.log('appointments', appointments)

		return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then(response => {
			console.log('response.body: ', response.body)
			setState({
				...state,
				appointments,
			})
		})
	}

	const appointments = getAppointmentsForDay(state, state.day)
	const schedule = appointments.map(appointment => {
		const interview = getInterview(state, appointment.interview)
		return (
			<Appointment
				key={appointment.id}
				appointments={appointments}
				{...appointment}
				interview={interview}
				interviewers={state.interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		)
	})

	return (
		<main className='layout'>
			<section className='sidebar'>
				<img className='sidebar--centered' src='images/logo.png' alt='Interview Scheduler' />
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList days={state.days} day={state.day} setDay={setDay} />
				</nav>
				<img className='sidebar__lhl sidebar--centered' src='images/lhl.png' alt='Lighthouse Labs' />
			</section>
			<section className='schedule'>
				{schedule}
				<Appointment key='last' time='5pm' />
			</section>
		</main>
	)
}
