import { getData, saveData } from '../../utils/db/index.js';
import { hash } from 'bcrypt';
const saltRounds = 10;

export const registerUser = async (request, reply) => {
  const { body } = request;
  const { username, password, firstName, lastName } = body;
  console.log(body);

  const hashedPassword = await hash(password, saltRounds);

  const db = await getData();

  // if a username exists
  if (db.users[username]) {
    return reply.badRequest('Username exists');
  }

  const user = {
    hashedPassword,
    firstName,
    lastName,
    createdDate: new Date().getTime(),
    updatedDate: new Date().getTime()
  };

  db.users[username] = user;

  await saveData(db);

  return {
    username,
    ...user
  };
};
