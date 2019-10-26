const bcrypt = require('bcryptjs');

// let salt = bcrypt.genSaltSync(10);

// console.log(salt);

// let hash = bcrypt.hashSync('a1b2c3', salt);

// console.log(hash);

let password = 'perasnsa';
let hashpasword = '$2a$10$gxdyfzKqJBOacQXUcLiIq.DLVfmq8kdwUg1mphlhKW/K0nxSOtR72';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

bcrypt.compare(password, hashpasword, (err, res) => {
    console.log(res);
});