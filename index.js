const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "data.db"
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.log(err.message)
        throw err
    }
    else{
        console.log('Connected to SQlite databaswe.')
    }
})

app.get('/f', (req, res) => res.send('hello World!'))

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/tag/:tag/:time", function(req, res){
    db.run(`INSERT INTO tags (tag, time) VALUES('${req.params.tag}', '${req.params.time}')`, function(err){
        if(err){
            return console.log(err.message);
        }
        
    })
})

app.listen(port, () => console.log(`Listening on ${port}`))