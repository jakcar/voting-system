const express = require('express')

const fs = require('fs')

const app = express()
const server = require('http').Server(app)

const io = require('socket.io')(server)

app.use(express.static('public'))
app.use(express.static('report'))

const voteStorage = require('./public/count.json')

const admin = {
    username: 'admin',
    password: 123,
}

let tot = function() {
    const total = {
        alVotes: 0,
        spVotes: 0,
        saVotes: 0,
        ovVotes: 0,
        ogVotes: 0,
    }
    for (let i = 0; i < voteStorage.length; i++) {
        total.alVotes += parseInt(voteStorage[i].alVotes)
        total.spVotes += parseInt(voteStorage[i].spVotes)
        total.saVotes += parseInt(voteStorage[i].saVotes)
        total.ovVotes += parseInt(voteStorage[i].ovVotes)
        total.ogVotes += parseInt(voteStorage[i].ogVotes)
    }
    return total
}

function writeVotes(content) {
    fs.writeFile('./public/count.json', content, 'utf8', err => {
        if (err) {
            console.error(err)
        } else {
            io.emit('districtVotes', voteStorage)
            io.emit('totalVotes', tot())
        }
    })
}

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/rapportera/', (req, res) => {
    let { username } = req.query
    let { password } = req.query
    if (username == admin.username && password == admin.password) {
        res.sendFile(`${__dirname}/report/report.html`)
    } else {
        res.sendStatus(401)
    }
})

io.on('connection', socket => {
    io.emit('districtVotes', voteStorage)
    io.emit('totalVotes', tot())

    socket.on('sendVotes', data => {
        let index = voteStorage.findIndex(u => u.distrikt == data.distrikt)
        let dist = voteStorage[index]

        let newStorage = {
            distrikt: data.distrikt,
            alVotes: (dist.alVotes += parseInt(data.alvotes)),
            spVotes: (dist.spVotes += parseInt(data.spvotes)),
            saVotes: (dist.saVotes += parseInt(data.savotes)),
            ovVotes: (dist.ovVotes += parseInt(data.ovvotes)),
            ogVotes: (dist.ogVotes += parseInt(data.ogvotes)),
        }

        voteStorage.splice(index, 1, newStorage)

        let readyToWrite = JSON.stringify(voteStorage)
        writeVotes(readyToWrite)
    })
})

server.listen(8081, () => {
    console.log('lyssnar på 8081')
})
