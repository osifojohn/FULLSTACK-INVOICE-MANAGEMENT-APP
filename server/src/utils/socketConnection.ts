import { Server, Server as SocketIOServer } from 'socket.io';
import http from 'http';

export class SocketConnection {
  private io: SocketIOServer;

  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
  }

  getIO(): SocketIOServer {
    if (!this.io) {
      throw new Error('Socket.io not initialized!');
    }
    return this.io;
  }
}
