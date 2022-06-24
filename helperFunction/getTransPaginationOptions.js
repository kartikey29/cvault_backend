const getOptions = (page) => {
  const options = {
    limit: 20,
    page: page,
    populate: [
      {
        path: "sender",
        select:
          "firstName MiddleName lastName phone email active referalCode userType",
      },
      {
        path: "receiver",
        select:
          "firstName MiddleName lastName phone email active referalCode userType",
      },
    ],
  };

  return options;
};

module.exports = getOptions;
