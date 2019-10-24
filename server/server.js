//----config
process.env["NODE_CONFIG_DIR"] = __dirname + '/config';

const config = require('config');
const { User } = require('./model/user');
console.log(`*** ${String(config.get('Level')).toUpperCase()} ***`);

let newUser = new User({
    fullname: 'farshad zarasvand',
    email: 'sdhd@jskjds.com',
    password: '12312323'
});

newUser.save().then((user) => {
    console.log('User has been saved to database', user);
});