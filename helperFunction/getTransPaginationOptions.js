const getOptions = (page) => {
  const options = {
    limit: 20,
    page: page,
    populate: [
      {
        path: "sender",
        select: "firstName MiddleName lastName phone email active referalCode ",
      },
      {
        path: "receiver",
        select: "firstName MiddleName lastName phone email active referalCode ",
      },
    ],
  };

  return options;
};

module.exports = getOptions;
