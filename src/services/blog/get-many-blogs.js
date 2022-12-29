import { getData } from '../../utils/db/index.js';

export const getManyBlogs = async (request, reply) => {
  const { query, username } = request;
  const { limit = 5 } = query;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getData();

  const list = [];

  const blogs = Object
    .entries(db.blogs)
    .map(function ([id, blogs]) {
      return {
        id,
        ...blogs
      };
    })
    .sort(function (blog1, blog2) {
      return blog2.createdDate - blog1.createdDate;
    });

  for (const blog of blogs) {
    const pickedBlog = blog;
    const comm = Object
      .entries(pickedBlog.comments)
      .map(function ([id, comment]) {
        return {
          id,
          ...comment
        };
      });

    pickedBlog.comments = comm;

    list.push(pickedBlog);
    if (list.length >= limit) {
      break;
    }
  }

  return list;
};
