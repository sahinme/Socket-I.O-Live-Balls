const socketio=require('socket.io');
const io=socketio();

const socketApi={ };
socketApi.io=io;

const users={ };

io.on('connection',(socket)=>{
     console.log('a user connected');
     socket.on('newUser',(data)=>{
        const defaultData={
            id:socket.id,
            position:{
                x:0,
                y:0
            }
        };
        const userData=Object.assign(data,defaultData); 
        users[socket.id]=userData;
        console.log(users);

        socket.broadcast.emit('newUser',users[socket.id]);
            socket.emit('initPlayers',users);
     });

     socket.on('animate',(data)=>{
        users[socket.id].position.x=data.x;
        users[socket.id].position.y=data.y;
       socket.broadcast.emit('animate',{socketId:socket.id,
        x:data.x,
        y:data.y
    }); 
    });

     socket.on('disconnect',()=>{
        socket.broadcast.emit('disconUser',(users[socket.id]));
        delete users[socket.id];
     });
});

module.exports=socketApi;