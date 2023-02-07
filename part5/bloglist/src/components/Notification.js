const Notification = ({ msg, type }) => {
  const defStyle = {
    color: 'green',
    backgroundColor: 'lightgray',
    fontSize: 16,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  const msgType = {
    success: {
      color: 'green',
      borderColor: 'green'
    },
    error: {
      color: 'red',
      borderColor: 'red'
    }
  };
  const style = Object.assign({}, defStyle, msgType[type]);
  return <div style={style}>{msg}</div>;
};

export default Notification;
