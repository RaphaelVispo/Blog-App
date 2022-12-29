import { getData, saveData } from '../../utils/db/index.js';

export const deleteComment = async (request, reply) => {
  const { params, username } = request;
  const { blogId, commentId } = params;

  const db = await getData();

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  if (db.blogs[blogId].comments[commentId].username !== username) {
    return reply.forbidden('You are not the owner of the comment');
  }

  delete db.blogs[blogId].comments[commentId];

  await saveData(db);

  return {
    success: true
  };
};
