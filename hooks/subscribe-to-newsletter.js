import { useState, useRef } from "react";

export function useSubscribeToNewsletter() {
	const [form, setForm] = useState({});
	const inputEl = useRef(null);

	async function subscribe(e) {
		e.preventDefault();
		setForm({ state: 'Loading' });

		const res = await fetch(`/api/subscribe`, {
			body: JSON.stringify({
				email: inputEl.current.value
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});

		const { error } = await res.json();

		if (error) {
			setForm({
				state: 'error',
				message: error
			});
			return;
		}


		inputEl.current.value = '';
		setForm({
			state: 'sucess',
			message: `Success! You've been added to the list!`
		});
	}

	return { subscribe, inputEl, form };
}