import { useEffect, useState } from 'react';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import Login from './components/Login';

import { getBlogList, addBlog } from './services/blog';

const App = () => {
  const [user, setUser] = useState('');
  const [blogData, setBlogData] = useState([]);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  useEffect(() => {
    if (user) {
      queryBlogList();
    } else {
      getUserInfo();
    }
  }, [user]);

  const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('user_info')) ?? {};
    if (userInfo) {
      setUser(userInfo.username);
    }
  };

  const queryBlogList = async () => {
    // 获取 bloglist
    const blogList = await getBlogList();
    setBlogData(blogList);
  };

  const handleCB = ({ status }) => {
    getUserInfo();
    if (status === 'in') {
      queryBlogList();
    }
  };

  const createBlog = async (newBlog) => {
    const blog = await addBlog(newBlog);
    const blogLists = blogData.concat(blog);

    setBlogData(blogLists);
    showMsg(`a new blog ${newBlog.title} added`, 'success');
  };

  const showMsg = (msg, type) => {
    setMsg(msg);
    setMsgType(type);

    const msgTimer = setTimeout(() => {
      clearTimeout(msgTimer);
      setMsg('');
    }, 2000);
  };

  return (
    <div>
      <Notification msg={msg} type={msgType} />
      <Login cb={handleCB} msgHandle={showMsg} />
      {user ? (
        <>
          <BlogForm createBlog={createBlog} />
          <BlogList list={blogData} />
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default App;
