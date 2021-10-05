const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');
const Client = require('../../models/client');
const User = require('../../models/user')

const insertClients = async (req, res, next) => {
  const { files, body } = req;

  const allowedMimeTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'];

  const createClientsFromChuck = (chunk) => new Promise((resolve, reject) => {
    let unprocessedRows = []

    chunk.forEach((row, index) => {
      if (row.includes(undefined)) {
        unprocessedRows.push(row)
      }

      if (index !== 0 && !row.includes(undefined)) {

        Client.find({ name: row[0], userCreated: body.userName }).then(client => {
          if (!client.length) {
            Client.create({
              name: row[0],
              country: row[1],
              city: row[2],
              category: row[3],
              userCreated: body.userName.toLowerCase(),
              isActive: row[4] === 'true'
            }, () => {})
          } else {
            Client.findByIdAndUpdate(client._id, {
              name: row[0],
              country: row[1],
              city: row[2],
              category: row[3],
              userCreated: body.userName.toLowerCase(),
              isActive: row[4] === 'true'
            }, () => {})
          }
        });

        resolve('Client created or updated')
      }
    });
  })


  if (files) {

    try {

      files.forEach(async (file) => {
        const filePath = path.join(`temp/${file.originalname}`);

        if (!allowedMimeTypes.includes(file.mimetype)) {

          return res.send('The file type is not supported');

        } else {

          fs.writeFileSync(filePath, file.buffer);

          // Parse buffer
          const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(filePath));

          workSheetsFromBuffer.forEach(async (sheet) => {
            let countries = {};
            let industries = {};
            let cities = {};

            sheet.data.map((entry, index) => {
              if (index > 0) {
                countries[entry[1]] = countries[entry[1]] + 1 || 1;
                cities[entry[2]] = cities[entry[2]] + 1 || 1;
                industries[entry[3]] = industries[entry[3]] + 1 || 1;
              }
            });

            let user = await User.find({name: body.userName})

            if (!user[0]) {
              await User.create({name: body.userName.toLowerCase(), clientData: {countries, cities, industries}});              
            } else {
              user = user.clientData = {countries, cities, industries};
              user.save();
            }

            for (i = 0, j = sheet.data.length; i < j; i += 200) {
              const chunkOfClients = sheet.data.slice(i, i + 200);
              await createClientsFromChuck(chunkOfClients)
            }



          });

          setTimeout(() => {
            fs.unlink(filePath, () => { });
            res.status(200).send('Clients created and updated');
          }, 5_000);
        }

      });

    } catch (error) {
      res.status(500).send('Something went wrong.')
    }

  } else {
    res.status(400).send('No files were sent.')
  }


}

module.exports = insertClients