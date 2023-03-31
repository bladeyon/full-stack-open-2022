import Blog from './Blog';
const BlogList = ({ list, onUpdate }) => {
  return (
    <>
      {list?.length ? (
        <div>
          {list?.map((blog) => (
            <Blog key={blog.id} data={blog} onUpdate={onUpdate} />
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default BlogList;
