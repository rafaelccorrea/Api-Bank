import jwt from 'jsonwebtoken';

const generateToken = (data) => {
  const token = jwt.sign(data, 'ganhepontos', {
    expiresIn: 186400,
  });

  return `bearer ${token}`;
};

export { generateToken };
