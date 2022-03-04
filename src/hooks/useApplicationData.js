import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useApplicationData() {
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

		const days = [...state.days].map(dayObj => {
			if (state.day === dayObj.name) {
				dayObj.spots = dayObj.spots - 1
			}
			return dayObj
		})

		const appointments = {
			...state.appointments,
			[id]: appointment,
		}
		return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then(response => {
			setState({
				...state,
				appointments,
				days,
			})
		})
	}

	const cancelInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		}
		const appointments = {
			...state.appointments,
			[id]: appointment,
		}
		const days = [...state.days].map(dayObj => {
			if (state.day === dayObj.name) {
				dayObj.spots = dayObj.spots + 1
			}
			return dayObj
		})
		return axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview }).then(response => {
			setState({
				...state,
				appointments,
				days,
			})
		})
	}
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	}
}
