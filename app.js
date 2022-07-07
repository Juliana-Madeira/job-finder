const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const db = require('./config/db.config');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const PORT = 3000;

app.use(express.json());


//body parser
app.use(bodyParser.urlencoded({ extended: false }));


//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')


//static folder
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db
    .authenticate()
    .then(() => {console.log('Connected to DB')})
    .catch(error => {console.log('Error to connect to DB', error)})

//basic route
app.get('/', (req,res) =>{

    let search = req.query.job;         //job é o name do input de busca
    let query = '%'+search+'%'        //% permite procurar PH e resultar PHP, procurar word e resultar wordpress...por exemplo
    
    if(!search){
        Job.findAll({order: [                          //findAll metodo do Sequelize que me traz todo Job do banco de dados
            ['createdAt', 'DESC']                      //order vai ordenar pela data de criação do job, DESC em ordem decrescente, do mais novo para o mais velho
        ]})       
        .then(jobs => {
    
            res.render('index', {jobs});
        })
        .catch(err => console.log(err));                         
    } else {
        Job.findAll({
            where: {title: {[Op.like]: query}},      
            order: [                          //findAll metodo do Sequelize que me traz todo Job do banco de dados
                ['createdAt', 'DESC']                      //order vai ordenar pela data de criação do job, DESC em ordem decrescente, do mais novo para o mais velho
        ]})       
        .then(jobs => {
    
            res.render('index', {jobs, search});
        })
        .catch(err => console.log(err));                          
    }
});

// app.get('/jobs/add', (req,res) => {      //rota inclusa no arquivo jobs.routes   (router.get)
//     res.render('add');
// })

//jobs routes
app.use('/jobs', require('./routes/jobs.routes'));


app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));