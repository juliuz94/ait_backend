const Client = require('../../models/client');

const getClients = async (req, res) => {
  const { query } = req;
  let baseQuery = {};
  const limit = parseInt(String(query.limit)) || 250;
  const skip = parseInt(String(query.skip)) || 0;

  const filterByProperty = (value, property, query) => {
    if (value == null) {
      return query;
    }
    query[property] = value;
    return query;
  };

  Object.entries(query).forEach((entry) => {
    if (entry[0] !== '' && entry[1] !== '') {
      queryBase = filterByProperty(entry[1], entry[0], baseQuery);
    }
  });

  const clients = await Client.find(baseQuery, null, { skip, limit });
  const count = await Client.count(baseQuery);
  
  res.status(200).json({
    count,
    data: clients
  });
}

module.exports = getClients