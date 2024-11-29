import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function ChatWindow({ user, chat }) {
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState('')

	useEffect(() => {
		if (!chat) return

		const fetchMessages = async () => {
			const { data, error } = await supabase
				.from('mensajes')
				.select('*')
				.eq('chat_id', chat.id)
				.order('enviado_en', { ascending: true })

			if (error) {
				console.error('Error:', error.message)
			} else {
				setMessages(data)
			}
		}

		fetchMessages()
	}, [chat])

	const sendMessage = async () => {
		if (!newMessage.trim()) return

		const { error } = await supabase.from('mensajes').insert([
			{
				chat_id: chat.id,
				autor_uid: user.id,
				contenido: newMessage,
			},
		])

		if (error) {
			console.error('Error mandando en mesnaje:', error.message)
		} else {
			setMessages([...messages, { contenido: newMessage, autor_uid: user.id }])
			setNewMessage('')
		}
	}

	if (!chat) {
		return <div className='chat-window'>Select a chat to start messaging</div>
	}

	return (
		<div className='chat-window'>
			<div className='chat-header'>{chat.participantName}</div>
			<div className='messages'>
				{messages.map((message, index) => (
					<div
						key={index}
						style={{
							textAlign: message.autor_uid === user.id ? 'right' : 'left',
							margin: '10px 0',
						}}
					>
						{message.contenido}
					</div>
				))}
			</div>
			<div className='input-box'>
				<input
					type='text'
					placeholder='Escribe tu mensaje...'
					value={newMessage}
					onChange={e => setNewMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Enviar</button>
			</div>
		</div>
	)
}

export default ChatWindow
