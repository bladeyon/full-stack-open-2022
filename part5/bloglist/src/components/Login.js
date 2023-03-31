import { useState, useEffect } from 'react';
import { login } from '../services/login';

const Login = ({ cb, msgHandle }) => {
  const userInfos = JSON.parse(localStorage.getItem('user_info')) ?? {};

  const [username, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [user, setUser] = useState(userInfos?.username);

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  const saveLoginInfo = async (e) => {
    e.preventDefault();
    if (!(pwd && username)) {
      msgHandle(`wrong username or password`, 'error');
      return;
    }
    try {
      const res = await login({ username, password: pwd });
      setUser(res.username);
      localStorage.setItem('user_info', JSON.stringify(res));
      msgHandle(`${username} logged`);
      setUserName('');
      setPwd('');
      cb && cb({ status: 'in' });
    } catch (error) {
      console.error('登录出错：', error);
      msgHandle(error, 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_info');
    msgHandle(`${user} log outed`);
    setUser(null);
    cb && cb({ status: 'out' });
  };

  const loginForm = () => (
    <>
      <h2>Login to App</h2>
      <form onSubmit={saveLoginInfo}>
        <div>
          username:
          <input
            type="text"
            value={username.value}
            onChange={handleNameChange}
          />
        </div>
        <div>
          password:
          <input type="password" value={pwd.value} onChange={handlePwdChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );

  const userInfo = () => (
    <>
      <h2>Blog</h2>
      <p>{user} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </>
  );

  return <>{user ? userInfo() : loginForm()}</>;
};

export default Login;
