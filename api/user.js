const bcrypt = require('bcrypt-nodejs');

module.exports = app =>{
    //gera um hash único da senha a chamada, porem,
    //é possível evidenciar que estes hashs tiveram a mesma origem
    const obterHash = (password, callback) =>{
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(password, salt, null, (err,hash) => callback(hash))
        })
    }

    const save = (req, res) =>{
        obterHash(req.body.password, hash =>{
            const password = hash;
            app.db('users').insert(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: password,
                }
                ).then(_ => res.status(201).send())
                .catch(err => res.status(500).json(err))
        });
    }

    const all =  (req,res) =>{
        app.db('users')
        .where('id','<>',0)
        .then((retorno) =>{
            res.status(200).json(retorno);
        })
        .catch((ex) =>{
            res.status(404).send('Nenhum usuário cadastrado!');
        });
    }

    return {save,all}
}
