require('dotenv').config();
const { Sequelize, QueryTypes, Model, DataTypes, Op } = require('sequelize');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
const dbUrl =
  process.env.DATABASE_URL ||
  'postgres://postgres:postgres@127.0.0.1:5432/postgres';

const sequelize = new Sequelize(dbUrl, {
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false
    // }
  }
});

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    author: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    // underscored: true,
    // freezeTableName: true,
    timestamps: false,
    tableName: 'blog'
  }
);

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    if (blogs) {
      res.json(blogs);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});

app.post('/api/blogs', async (req, res) => {
  const newBlog = new Blog({ ...req.body, id: 2 });
  try {
    const blog = await newBlog.save();
    if (blog) {
      res.json(blog);
    } else {
      res.status(400).end();
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const oBlog = await Blog.findByPk(req.params.id);
    if (oBlog) {
      const newBlog = new Blog({ ...oBlog, ...req.body });
      const blog = await newBlog.save();
      if (blog) {
        return res.json(blog);
      } else {
      }
    }
    res.status(400).end();
  } catch (error) {
    console.error('Error:', error.message);
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.destroy({
      where: {
        id: {
          [Op.eq]: req.params.id
        }
      }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error:', error.message);
  }
});

const main = async () => {
  try {
    await sequelize.authenticate(); // 测试连接状态
    console.log('Connection has been established successfully.');
    // sequelize.close();
    // await initBlog();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

main();
