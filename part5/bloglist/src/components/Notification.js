const Notification = ({ msg, type = 'success' }) => {
  const defStyle = {
    position: 'fixed',
    right: '10px',
    top: '10px',
    color: 'green',
    backgroundColor: 'lightgray',
    fontSize: 16,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: '5px',
    padding: '10px'
  };

  const msgStyle = {
    success: {
      color: 'green',
      borderColor: 'green'
    },
    error: {
      color: 'red',
      borderColor: 'red'
    }
  };

  const style = Object.assign({}, defStyle, msgStyle[type]);
  return <>{msg ? <div style={style}>{msg}</div> : ''}</>;
};

export default Notification;
