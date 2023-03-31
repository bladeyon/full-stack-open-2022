import { useState } from 'react';
import Notification from '../components/Notification';

const useNotice = (text, type) => {
  const [msg, setMsg] = useState(text);
  const [msgType, setMsgType] = useState(type);

  setMsg(msg);
  setMsgType(type);

  const msgTimer = setTimeout(() => {
    clearTimeout(msgTimer);
    setMsg('');
    setMsgType('');
  }, 1500);

  return <Notification msg={msg} type={msgType} />;
};
export default useNotice;
