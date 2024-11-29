function Message({ text, sender }) {
	return (
		<div className={`mensaje ${sender === 'Tu' ? 'saliente' : 'llegando'}`}>
			<p>{text}</p>
		</div>
	)
}

export default Message
