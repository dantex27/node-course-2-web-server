const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to create file.')
        }
    })

    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs', {
//         pageTitle: 'Site Under Construction !'
//     })
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.get('/',(req, res)=>{
    res.render('home.hbs',{
        name: "Aashish",
        pageTitle: 'Welcome page'
    })
});

app.get('/about',(req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad',(req, res)=>{
    res.send({
        error:{
            message: 'Error 404!'
        }
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port: 3000!');
});