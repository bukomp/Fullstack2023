const Notification = ({ notification }) => {
    return notification === ""
        ? null
        : (
            <div className={notification.status === 'notification' ? 'notification' : 'error'}>
                {notification.message}
            </div>
        )
}

export default Notification