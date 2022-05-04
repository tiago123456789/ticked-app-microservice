
const Alert = (props) => {
    let messages = props.message
    const isMessageList = Array.isArray(messages);
    if (!isMessageList) {
        messages = [messages]
    }

    return (
        <div className={`alert ${props.type}`}>
            { 
                messages.map(message => {
                    return (
                        <p>{message}</p>
                    )
                })
            }
        </div>
    )
}

export default Alert;