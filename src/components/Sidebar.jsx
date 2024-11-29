import ChatList from './ChatList'

function Sidebar({ onSelectChat, isOpen, onClose }) {
	return (
		<div className={`sidebar ${isOpen ? 'abierta' : ''}`}>
			<div className='sidebar-header'>
				<h2>
					<img src='chat.svg' width={20} /> Mi Chat
				</h2>
				<button className='close-button' onClick={onClose}>
					&times;
				</button>
			</div>
			<ChatList
				onSelectChat={chat => {
					onSelectChat(chat)
					onClose() // aqui le he puesto un poco de responsive para que en pantallas pequeñas el sidebar se cierre
				}}
			/>
		</div>
	)
}

export default Sidebar
