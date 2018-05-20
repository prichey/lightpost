const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// the ubiquitous
const app = express();

// lowdb is okay for a toy app, right? ;)
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');

// initialize db
low(adapter).then(db => db.defaults({ employees: [] }).write());

// middleware
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.static(path.resolve('client/build')));

// normally I wouldn't have all my routes in one file but I figure it's fine for now
app.use('/api', require('./api'));

// TODO: restore
// any non-api gets get the react app!
// app.get('*', (req, res) => {
//   console.log('non-api request');
//   res.sendFile(path.join(process.cwd(), 'client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
