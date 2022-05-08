import db from '../models';
import crypto from 'crypto';

const { auth } = db.models;

const hashedPassword = (pw: string, salt: string) => {
  return crypto
    .createHash('sha512')
    .update(pw + salt)
    .digest('hex');
}

export const createAuth = ({ email, password, name, department }: any) => {
  const salt = crypto.randomBytes(128).toString('base64');

  return auth.create({
    email,
    password: hashedPassword(password, salt),
    name,
    salt,
    department,
  });
}

export const getUser = async ({ email, password }: any) => {
  const { dataValues: user } = await auth.findOne({
    where: {
      email,
    }
  });

  if(!user) {
    throw new Error('email or password is wrong');
  }

  const hashedInserPassword = hashedPassword(password, user.salt);
  if(user.password === hashedInserPassword) {
    return {
      name: user.name,
      email: user.email,
      department: user.department,
    };
  } else {
    throw new Error('email or password is wrong');
  }
}

export const updateAuth = ({ email, name, department }: any) => {
  // TODO
}
