import { useState } from 'react';

const App = () => {
  const [username, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [user, setUser] = useState(null);
  const [blogData, setBlogData] = useState([{ id: 1, title: 'blog' }]);

  const saveLoginInfo = (e) => {
    e.preventDefault();
    setUser(username);
    setUserName('');
    setPwd('');
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
      <h2>Blog</h2>
      <p>{user} logged in</p>
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
    return <div>{loginForm()}</div>;
  }
  return <div>{blogList()}</div>;
};

export default App;
