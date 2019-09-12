module.exports = app =>{
    const servicesHome = (req,res) =>{
        res.status(200).send('Bem vindo ao servico de IPI tasks');
    }
    return {servicesHome}
}
