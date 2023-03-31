import { useState } from 'react';

const Blog = ({ data, onUpdate }) => {
  const [isShow, setIsShow] = useState(false);

  const showDetail = () => {
    setIsShow(!isShow);
  };
  const handleLike = async () => {
    const newData = { ...data, likes: data.likes + 1 };
    onUpdate(newData);
  };

  const detailStyle = {
    border: '1px solid black',
    margin: '5px 10px',
    padding: '5px'
  };

  const blogListStyle = {
    margin: '10px'
  };

  const blogTitleStyle = {
    ...detailStyle,
    margin: '5px'
  };

  return (
    <dl style={blogListStyle}>
      <dt style={blogTitleStyle}>
        {data.title}
        <button onClick={showDetail}>view</button>
      </dt>
      {isShow ? (
        <dd style={detailStyle}>
          <div>{data.url}</div>
          <div>
            likes {data.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{data.author}</div>
        </dd>
      ) : (
        ''
      )}
    </dl>
  );
};

export default Blog;
