const User = require('../../models/user');

const getClientsMetadata = async (req, res) => {
  const { query } = req;
  console.log(query)
  let baseQuery = query.userName ? {name: query.userName} : {};

  const data = await User.findOne({name: query.userName});

  res.status(200).json({
    data
  });
}

module.exports = getClientsMetadata