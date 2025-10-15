import { Server } from 'socket.io';
import HttpServer from '@ioc:Adonis/Core/Server';

const io = new Server(HttpServer.instance!, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  path: '/socket.io',
});

io.on('connection', (socket) => {
  //console.log('Cliente conectado via Socket.IO', socket.id);

  // socket.on('join', (orgaoId: number) => {
  //   const room = `orgao_${orgaoId}`;
  //   socket.join(room);
  //   //console.log(`Socket ${socket.id} entrou na sala ${room}`);
  // });

  // const ChatController = require('../addons/modulo-sigdoc/src/mensagem/main/controllers/chat-controller').default;
  // const chatController = new ChatController();
  // const MensagemRepository = require('../addons/modulo-sigdoc/src/mensagem/repoositorio/crud-respositorio').default;
  // const mensagemRepo = new MensagemRepository();

  socket.on('message', (rawMessage, callback) => {
    
  });

  socket.on('disconnect', () => {
    //console.log('Cliente desconectado:', socket.id);
  });
});

//console.log(`WebSocket rodando na porta ${Env.get('PORT')} e host ${Env.get('HOST')}`);