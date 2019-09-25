const moment = require('moment');
module.exports = app =>{
    const getTasks = (req,res) =>{
        const dateStart = req.query.dateStart ?
        req.query.dateStart : moment().startOf('day').toDate();
        const dateEnd = req.query.dateEnd ?
        req.query.dateEnd : moment().endOf('day').toDate();

        console.log('dateStart: '+dateStart+' dateEnd: '+dateEnd)

        app.db('tasks')
        .where({ userId: req.user.id })
        .whereBetween('estimateAt', [dateStart,dateEnd] )
        .orderBy('estimateAt')
        .then(tasks => res.json(tasks))
        .catch(err =>
            {
            let mensagem = 'Algo inesperado aconteceu, tente novamente mais tarde! '
            mensagem += 'Se persistir contate o administrador do sistema.'
            const resp = {msg: mensagem}
            res.status(500).json(resp)
            })
    }

    const save = (req,res) =>{
        if(!req.body.desc){
            return res.status(500).json('O parâmetro descrição é obrigatório!')
        }
        req.body.userId = req.user.id;
        app.db('tasks').insert(req.body)
        .then(_ => {
            const resp = {msg: 'Atividade criada com sucesso!'}
            res.status(201).json(resp)

    })
        .catch(err =>
            {
            let mensagem = 'Algo inesperado aconteceu, tente novamente mais tarde! '
            mensagem += 'Se persistir contate o administrador do sistema.'
            const resp = {msg: mensagem}
            res.status(500).json(resp)
            })
    }

    const remove = (req, res) =>{
        app.db('tasks')
        .where({id: req.params.id, userId: req.user.id})
        .del()
        .then(rowsDeleted =>{
            if(rowsDeleted > 0){
                res.status(204).send()
            }else{
                const msg = `Não foi possível localizar task com id ${req.params.id}.`
                res.status(400).send(msg);
            }
        })
        .catch(err =>
            {
            let mensagem = 'Algo inesperado aconteceu, tente novamente mais tarde! '
            mensagem += 'Se persistir contate o administrador do sistema.'
            const resp = {msg: mensagem}
            res.status(500).json(resp)
            })
    }

    const updateTaskDoneAt = (req,res,doneAt) =>{
        app.db('tasks')
        .where({id: req.params.id, userId: req.user.id})
        .update({doneAt})
        .then(_ => res.status(204).send())
        .catch(err =>
            {
            let mensagem = 'Algo inesperado aconteceu, tente novamente mais tarde! '
            mensagem += 'Se persistir contate o administrador do sistema.'
            const resp = {msg: mensagem}
            res.status(500).json(resp)
            })
    }

    const toggleTask = (req,res) =>{
        app.db('tasks')
        .where({id: req.params.id, userId: req.user.id})
        .first()
        .then(task =>{
            if(!task){
                const msg = `Task com id ${req.params.id} não encontrada.`;
                return res.status(400).send(msg);
            }

            const doneAt = task.doneAt ? null : new Date()
            updateTaskDoneAt(req,res,doneAt)
        })
        .catch(err =>
            {
            let mensagem = 'Algo inesperado aconteceu, tente novamente mais tarde! '
            mensagem += 'Se persistir contate o administrador do sistema.'
            const resp = {msg: mensagem}
            res.status(500).json(resp)
            })
    }




    return {getTasks,save, remove,toggleTask}
}
