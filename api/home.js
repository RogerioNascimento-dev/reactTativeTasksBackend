module.exports = app =>{
    const servicesHome = (req,res) =>{
        res.status(200).send('Tasks Backend API');
    }
    return {servicesHome}
}
