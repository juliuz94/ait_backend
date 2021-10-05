const User = require('../../models/user');

const getClientsMetadata = async (req, res) => {
  const { query } = req;
  let baseQuery = query.userName ? {"name": query.userName} : {};

  const filterByProperty = (value, property, query) => {
    if (value == null) {
      return query;
    }
    query[property] = value;
    return query;
  };

  const data = await User.findOne(baseQuery);

  res.status(200).json({
    data
  });
}

module.exports = getClientsMetadata