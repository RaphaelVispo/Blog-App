import { getData, saveData } from '../../utils/db/index.js';

export const updateUserData = async (request, reply) => {
  const { params, body, username } = request;
  const { userId } = params;
  const { firstName, lastName } = body;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getData();

  if (userId !== username) {
    return reply.forbidden('You cannot other users data');
  }

  db.users[userId].firstName = firstName || db.users[userId].firstName;
  db.users[userId].lastName = lastName || db.users[userId].lastName;
  db.users[userId].updatedDate = new Date().getTime();

  await saveData(db);

  return {
    username: userId,
    ...db.users[userId]
  };
};
