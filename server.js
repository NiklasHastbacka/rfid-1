var app = require('express')();
var cors = require('cors')
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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

app.use(cors());
app.set('socketio', io);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/f', (req, res) => res.send('hello World!'))

app.get("/rfid/:rfid/:milli", (req, res) => { //http://localhost:3000/usermedia/2
    res.type('json')
    let rfid = req.params.rfid;
    let milli = req.params.milli;
    var io = req.app.get('socketio');
    console.log(rfid + " " + milli)
    io.emit('rfid', {rfid : rfid, milli: milli});
    res.send({rfid : rfid, milli: milli})
    db.run(`INSERT INTO tags (tag, time) VALUES('${rfid}', '${milli}')`, function(err){
        if(err){
            return console.log(err.message);
        }
        
    })
  })

http.listen(4444, () => {
  console.log('listening on *:4444');
});