import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function ChatList({ userId, onSelectChat }) {
	const [chats, setChats] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchChats = async () => {
			try {
				const { data, error } = await supabase
					.from('chats')
					.select(
						`
                        id,
                        usuario1_uid,
                        usuario2_uid,
                        usuarios1:usuario1_uid (nombre),
                        usuarios2:usuario2_uid (nombre)
                    `,
					)
					.or(`usuario1_uid.eq.${userId},usuario2_uid.eq.${userId}`)

				if (error) {
					console.error('Error fetching chats:', error.message)
				} else {
					const processedChats = data.map(chat => {
						const isUser1 = chat.usuario1_uid === userId
						return {
							id: chat.id,
							participantName: isUser1
								? chat.usuarios2?.nombre
								: chat.usuarios1?.nombre,
						}
					})
					setChats(processedChats)
				}
			} catch (error) {
				console.error('error:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchChats()
	}, [userId])

	if (loading) return <div>Cargando chats...</div> //para dar feedback de la carga que a veces tarda mucho

	return (
		<div className='chat-list'>
			{chats.map(chat => (
				<div
					key={chat.id}
					className='chat-item'
					onClick={() => onSelectChat(chat)}
					style={{ cursor: 'pointer' }}
				>
					{chat.participantName || 'Unknown'}
				</div>
			))}
		</div>
	)
}

export default ChatList
