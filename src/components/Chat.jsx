import React from 'react'

function Chat({ chat, userId }) {
	const chatPartner =
		chat.usuario1_uid === userId ? chat.usuario2_uid : chat.usuario1_uid

	return (
		<div className='chat'>
			<p>Chat con: {chatPartner}</p>
		</div>
	)
}

export default Chat
