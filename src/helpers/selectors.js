function getAppointmentsForDay(state, day) {
	const appsForDay = []
	const selectedDayArr = state.days.filter(eachDay => eachDay.name === day)
	const selectedDay = selectedDayArr[0]
	if (selectedDay !== undefined) {
		const appsArr = selectedDay.appointments
		for (const app of appsArr) {
			if (state.appointments[app].id === app) appsForDay.push(state.appointments[app])
		}
	}
	return appsForDay
}

function getInterview(state, interview) {
	if (interview !== null) {
		const interviewObj = {}
		const interviewers = state.interviewers
		for (let intrvwr in interviewers) {
			const interviewer = interviewers[intrvwr]
			if (interview.interviewer === interviewer.id) {
				interviewObj['student'] = interview.student
				interviewObj['interviewer'] = interviewer
			}
		}
		return interviewObj
	} else return null
}

// getInterview(state, state.appointments[3].interview)

module.exports = { getAppointmentsForDay, getInterview }
