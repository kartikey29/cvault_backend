const generateReferalCode = () => {
  const result = Math.random().toString(36).substring(2, 6);
  return result;
};

module.exports = generateReferalCode;
