const express = require('express');
const path=require('path')
const app = express();

const socket = require('socket.io');

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
        socket.on('message', (body)=>{
            socket.broadcast.emit('message', {
                body,
                from: socket.id
            })
        })
    }
);
