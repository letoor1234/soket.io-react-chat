const express = require('express');
const path=require('path')
const app = express();

const socket = require('socket.io');

const webpack = require('webpack');
const webpackMidd = require('webpack-dev-middleware');
const config=(require('../webpack.config'));

app.set('port', process.env.PORT || 3000);

app.use(webpackMidd(webpack(config)));
app.use(express.static(path.join(__dirname,'public')));

//DEFINE LA CONSTANTE CUANDO ESTA INICIALIZADO!!
const server=app.listen(app.get('port'), ()=>{
    console.log("Server on port: ", app.get('port'));
});
//NECESITA UNA APP YA INICIALIZADA!! 
const io= socket(server)

io.on("connection", 
    (socket) => { 
        console.log("New client connected", socket.id)
        socket.on('message', (body)=>{
            console.log(body);
            socket.broadcast.emit('message', {
                body,
                from: socket.id
            })
        })
    }
);
