import { getData, saveData } from '../../utils/db/index.js';

export const deleteBlog = async (request, reply) => {
  const { params, username } = request;
  const { blogId: id } = params;
  const db = await getData();

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  if (db.blogs[id].username !== username) {
    return reply.forbidden('You are not the owner of the todo');
  }

  delete db.blogs[id];

  await saveData(db);

  return {
    success: true
  };
};
