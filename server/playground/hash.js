const bcrypt = require('bcryptjs');

// let salt = bcrypt.genSaltSync(10);

// console.log(salt);

// let hash = bcrypt.hashSync('a1b2c3', salt);

// console.log(hash);

// let password = 'perasnsa';
// let hashpasword = '$2a$10$gxdyfzKqJBOacQXUcLiIq.DLVfmq8kdwUg1mphlhKW/K0nxSOtR72';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

// bcrypt.compare(password, hashpasword, (err, res) => {
//     console.log(res);
// });

const jwt = require('jsonwebtoken');
let data = {
    id: 1,
    name: 'peransa'
};

let token = jwt.sign(data, '12321');
console.log(token);

let decode = jwt.verify(token, '12321');
console.log('decoded: ', decode);