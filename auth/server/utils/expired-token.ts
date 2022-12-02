const setExpired = () => {
  let expiryDate = new Date(new Date().setHours(new Date().getHours() + 8));
  return expiryDate;
};

export default setExpired;
