const bcrypt = require("bcryptjs");
const refreshToken = (email: string) => {
  const salt = bcrypt.genSaltSync(10);
  const token = bcrypt.hashSync(email, salt);
  return token;
};
export default refreshToken;
