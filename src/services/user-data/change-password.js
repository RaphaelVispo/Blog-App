import { getData, saveData } from '../../utils/db/index.js';
import { hash } from 'bcrypt';
const saltRounds = 10;

export const changePassword = async (request, reply) => {
  const { body, username } = request;
  const { newPassword } = body;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getData();

  const hashedPassword = await hash(newPassword, saltRounds);

  console.log(`old: ${db.users[username].hashedPassword} new: ${hashedPassword}`);
  db.users[username].hashedPassword = hashedPassword;

  await saveData(db);

  return {
    success: true
  };
};
