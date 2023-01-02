import { getData, saveData } from '../../utils/db/index.js';

export const updateComment = async (request, reply) => {
  const { params, body, username } = request;
  const { blogId: blogid, commentId } = params;
  const { message } = body;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getData();

  if (db.blogs[blogid].comments[commentId].username !== username) {
    return reply.forbidden('You are not the owner of the todo');
  }

  db.blogs[blogid].comments[commentId].message = message || db.blogs[blogid].comments[commentId].message;
  db.blogs[blogid].comments[commentId].updatedDate = new Date().getTime();

  await saveData(db);

  return {
    id: commentId,
    ...db.blogs[blogid].comments[commentId]
  };
};
