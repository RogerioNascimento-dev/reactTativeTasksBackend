require('dotenv/config');
const moment = require('moment');
const  authSecret  = process.env.AUTH_SECRET;

const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const signin = async (req,res) =>{
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Dados incompletos');
        }
        const user = await app.db('users')
        .whereRaw('LOWER(email) = LOWER(?)',req.body.email)
        .first();

        //se encontrar o usuário através do e-mail
        //chama o compare do bcrypt para checar se os hashs da senha
        //tem a mesma string de origem
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, isMatch) =>{
                if(err || !isMatch){
                    return res.status(401).send('Usuário e/ou senha não confere.');
                }

                const payload = { id: user.id }
                res.json({
                    name:   user.name,
                    email:  user.email,
                    token:  jwt.encode(payload, authSecret),
                })
                console.log('Usuário: '+user.email+' efetuou login. '+moment().format('D MMMM YYYY [ás] H:m:s'))
            });
        }else{
            return res.status(401).send('Usuário e/ou senha não confere.');
        }
    }

    return { signin }
}
