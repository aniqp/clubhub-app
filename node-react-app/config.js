let config = {
  host    : 'ec2-18-216-101-119.us-east-2.compute.amazonaws.com',
  user    : process.env.MYSQL_USER || 'a8premji',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: 'f4morris'
};
 
module.exports = config;
