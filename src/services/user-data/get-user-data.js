import { getData } from '../../utils/db/index.js';

export const getUserData = async (request, reply) => {
  const { params, username } = request;
  const { userId } = params;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getData();

  const { users } = db;

  return {
    username: userId,
    ...users[userId]
  };
};
