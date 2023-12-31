export interface ServerToClientEvents {
  //   noArg: () => void;
  //   basicEmit: (a: number, b: string, c: Buffer) => void;
  //   withAck: (d: string, callback: (e: number) => void) => void;
  serverMsg: (data: { msg: string; room: string }) => void;
}

export interface ClientToServerEvents {
  //   hello: () => void;
  clientMsg: (data: { msg: string; room: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
