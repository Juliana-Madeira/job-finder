const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


//test
router.get('/tests', (req, res) => {
    res.send('deu certo');
})

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