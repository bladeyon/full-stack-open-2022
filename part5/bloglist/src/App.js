import { useState } from 'react';

const App = () => {
  const [username, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [blogData, setBlogData] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const saveLoginInfo = (e) => {
    e.preventDefault();
    setUser(username);
    localStorage.setItem('user', username);
    setUserName('');
    setPwd('');
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      url,
      author
    };
    const blogLists = blogData.concat(newBlog);

    setBlogData(blogLists);
    setTitle('');
    setAuthor('');
    setUrl('');
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
      <div>
        <h2>create new blog</h2>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
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
