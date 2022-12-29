import { getData } from '../../utils/db/index.js';

export const getBlog = async (request, reply) => {
  const { params, username } = request;
  const { blogId: id } = params;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getData();

  const { blogs } = db;

  if (!blogs[id]) {
    return reply.notFound();
  }

  const pickedBlog = blogs[id];
  const comm = Object
    .entries(pickedBlog.comments)
    .map(function ([id, comment]) {
      return {
        id,
        ...comment
      };
    });

  pickedBlog.comments = comm;

  return {
    id,
    ...pickedBlog
  };
};
