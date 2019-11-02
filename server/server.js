//---Config
process.env.NODE_CONFIG_DIR = __dirname + '/config';

const config = require('config');
const express = require('express');
const _ = require('lodash');

const {
    User
} = require('./model/user');

console.log(`*** ${String(config.get('Level')).toUpperCase()} ***`);

const app = express();
app.use(express.json());

app.post('/api/users', async(req, res) => {
    try {
        const body = _.pick(req.body, ['fullname', 'email', 'password']);
        let user = new User(body);
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).json({
            Error: `Something went wrong. ${error}`
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

            } catch (error) {
                res.status(400).json({
                    Error: `something went wrong.  ${error}`
                });
            }
            app.listen(config.get('PORT'), () => {
                console.log(`Server is running on port ${config.get('PORT')}`);
            });

            // let newUser = new User({
            //     fullname: 'farshad zarasvand',
            //     email: 'sdhd@jskjds.com',
            //     password: '12312323'
            // });

            // newUser.save().then((user) => {
            //     console.log('User has been saved to database', user);
            // });
            //comment