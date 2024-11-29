//este archivo es para poder manejar el login

import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

function Auth() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async e => {
		e.preventDefault()

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			console.error('Error logueandose:', error.message)
			alert('Login fallido: ' + error.message)
		} else {
			alert('Login exitoso!!!!!!!')
		}
	}

	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<input
						type='email'
						placeholder='Pon tu email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						type='password'
						placeholder='Pon tu contraeña'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default Auth
