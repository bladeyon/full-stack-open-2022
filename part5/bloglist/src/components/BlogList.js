import Blog from './Blog';
const BlogList = ({ list, onUpdate, onRemove }) => {
  return (
    <>
      {list?.length ? (
        <div>
          {list?.map((blog) => (
            <Blog
              key={blog.id}
              data={blog}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default BlogList;
