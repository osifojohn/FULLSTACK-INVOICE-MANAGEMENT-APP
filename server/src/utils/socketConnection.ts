import * as socketio from 'socket.io';

//@ts-ignore
export default class SocketConnection {
  [x: string]: any;
  constructor(server: any) {
    //@ts-ignore
    this.io = new socketio.Server(server, {
      cors: {
        origin: ['http://localhost:3000'],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true,
        // methods:['get','post']
      },
    });
  }

  getIO() {
    if (!this.io) {
      throw new Error('Socket.io not initialized!');
    }
    return this.io;
  }
}
