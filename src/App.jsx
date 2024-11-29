import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/Auth'
import ChatList from './components/ChatList'
import ChatWindow from './components/ChatWindow'

function App() {
	const [user, setUser] = useState(null)
	const [selectedChat, setSelectedChat] = useState(null)

	useEffect(() => {
		const getSession = async () => {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession()
			if (error) console.error('Error obteniendose la sesion:', error.message)
			setUser(session?.user || null)
		}

		getSession()

		const { data: subscription } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user || null)
			},
		)

		return () => {
			subscription?.subscription.unsubscribe()
		}
	}, [])

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) console.error('Error saliendose:', error.message)
	}

	return (
		<div className='app'>
			{user ? (
				<>
					<div className='sidebar'>
						<div className='sidebar-header'>
							<span>Mi Chat</span>
							<button
								onClick={handleLogout}
								style={{
									background: 'transparent',
									border: 'none',
									color: 'white',
								}}
							>
								✖
							</button>
						</div>
						<ChatList userId={user.id} onSelectChat={setSelectedChat} />
					</div>
					<ChatWindow user={user} chat={selectedChat} />
				</>
			) : (
				<Auth />
			)}
		</div>
	)
}

export default App
