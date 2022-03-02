import { useState } from 'react'

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial)
	const [history, setHistory] = useState([initial])

	function transition(mode, replace = false) {
		if (replace === true) {
			setMode(history[history.length - 1])
		} else history.push(mode)
		return setMode(mode)
	}

	function back(mode) {
		if (history.length > 1) {
			history.pop()
			const prevModeIndex = history.length - 1
			return setMode(history[prevModeIndex])
		} else return mode
	}

	return {
		mode,
		transition,
		back,
	}
}
