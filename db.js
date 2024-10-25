const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database-1', 'admin', 'ary1nay2', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

sequelize.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;
