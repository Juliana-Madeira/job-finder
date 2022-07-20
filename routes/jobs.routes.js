const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


//test
router.get('/tests', (req, res) => {
    res.send('deu certo');
})

//detalhe da vaga -> view/1, view/2
router.get('/view/:id', (req,res) => 
    Job.findOne({
        where: {id: req.params.id}
    }).then(job => {
        res.render('view', {job})
    }) .catch(err => console.log(err))
);

//form da rota de envio
router.get('/add', (req,res) => {
    res.render('add');
})

//add job
router.post('/add', (req, res) => {
    let { title, description, salary, company, email, new_job } = req.body;

    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router; 