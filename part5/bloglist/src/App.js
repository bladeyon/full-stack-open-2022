import { useState } from 'react';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [username, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [blogData, setBlogData] = useState([]);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const saveLoginInfo = (e) => {
    e.preventDefault();
    if (!(pwd && username)) {
      showMsg(`wrong username or password`, 'error');
      return;
    }
    setUser(username);
    localStorage.setItem('user', username);
    setUserName('');
    setPwd('');
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const createBlog = (newBlog) => {
    const blogLists = blogData.concat(newBlog);

    setBlogData(blogLists);
    showMsg(`a new blog ${newBlog.title} added`, 'success');
  };

  const showMsg = (msg, type) => {
    setMsg(msg);
    setMsgType(type);

    const msgTimer = setTimeout(() => {
      clearTimeout(msgTimer);
      setMsg('');
      setMsgType('');
    }, 1500);
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
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={pwd.value}
            onChange={({ target }) => setPwd(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );

  const blogList = () => (
    <>
      <h2>Blogs</h2>
      <span>{user} logged in</span>
      <button onClick={handleLogout}>logout</button>
      <BlogForm createBlog={createBlog} />
      <div>
        {blogData.length ? (
          <ol>
            {blogData.map((blog) => (
              <li>{blog.title}</li>
            ))}
          </ol>
        ) : (
          ''
        )}
      </div>
    </>
  );

  if (!user) {
    return (
      <div>
        {msg ? <Notification msg={msg} type={msgType} /> : ''}
        {loginForm()}
      </div>
    );
  }
  return (
    <div>
      {msg ? <Notification msg={msg} type={msgType} /> : ''}
      {blogList()}
    </div>
  );
};

export default App;
