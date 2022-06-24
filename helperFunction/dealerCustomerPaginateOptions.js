const getOptions = (page) => {
  const options = {
    limit: 20,
    page: page,
    populate: {
      path: "transactions",
      populate: [
        { path: "receiver", select: "firstName middleName lastName" },
        { path: "sender", select: "firstName middleName lastName" },
      ],
    },
    select: "-token -status",
  };

  return options;
};

module.exports = getOptions;
