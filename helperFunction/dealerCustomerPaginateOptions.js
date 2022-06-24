const getOptions = (page) => {
  const options = {
    limit: 20,
    page: page,
    populate: {
      path: "transactions",
      populate: [
        {
          path: "receiver",
          select:
            "firstName MiddleName lastName phone email active referalCode userType",
        },
        {
          path: "sender",
          select:
            "firstName MiddleName lastName phone email active referalCode userType",
        },
      ],
    },
    select: "-token -status",
  };

  return options;
};

module.exports = getOptions;
