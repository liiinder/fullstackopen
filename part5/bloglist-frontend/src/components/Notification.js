const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    const text = message[0]
    const type = message[1]

    return (
        <div className={"message " + type}>
            {text}
        </div>
    )
}

export default Notification