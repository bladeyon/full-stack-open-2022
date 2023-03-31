import Blog from './Blog';
const BlogList = ({ list }) => {
  return (
    <>
      {list?.length ? (
        <ol>
          {list?.map((blog) => (
            <Blog key={blog.id} data={blog} />
          ))}
        </ol>
      ) : (
        ''
      )}
    </>
  );
};

export default BlogList;
