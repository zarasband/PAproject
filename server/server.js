//---Config
process.env.NODE_CONFIG_DIR = __dirname + '/config';

const config = require('config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { authenticate } = require('./middleware/authenticate');

const { User } = require('./model/user');

console.log(`*** ${String(config.get('Level')).toUpperCase()} ***`);

const app = express();
const requestLogger = fs.createWriteStream(path.join(__dirname, 'log/requests.log'));
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(__dirname, 'log/server-status.log') })
    ]
});

app.use(express.json());
app.use(helmet());
app.use(morgan('combined', { stream: requestLogger }));

app.post('/api/users', authenticate, async(req, res) => {
    try {
        const body = _.pick(req.body, ['fullname', 'email', 'password']);
        let user = new User(body);

        await user.save();
        res.status(200).send(user);
    } catch (e) {
        res.status(400).json({
            Error: `Something went wrong. ${e}`
        });
    }
});

app.post('/api/login', async(req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);

        let user = await User.findByCredentials(body.email, body.password);
        let token = await user.generateAuthToken();
        res.header('x-auth', token)
            .status(200)
            .send(token);
    } catch (e) {
        res.status(400).json({
            Error: `Something went wrong. ${e}`
        });
    }
});

app.listen(config.get('PORT'), () => {
    // console.log(`Server is running on port ${config.get('PORT')}`);
    // logger.log({
    //     level: 'info',
    //     message: `Server running on port ${config.get('PORT')}`
    // });
    logger.info(`Server running on port ${config.get('PORT')}`);
});


// let newUser = new User({
//     fullname: 'farshad zarasvand',
//     email: 'sdhd@jskjds.com',
//     password: '12312323'
// });

// newUser.save().then((user) => {
//     console.log('User has been saved to database', user);
// });