import { io, Socket } from "socket.io-client";

export let socket:any = io(`${process.env.REACT_APP_API_URI}`, {
  path: "/socket.io",
  transports: ["websocket"],
});

export const initSocketConnection = () => {
  if (socket) return;


  socket.connect()

  console.log('연결된거 맞다니깐')

};


export const sendSocketMessage = (cmd: any, body = null) => {
  if (socket == null || socket.connected === false) {
    initSocketConnection();
  }
  socket.emit("message", {
    cmd: cmd,
    body: body,
  });
};
const cbMap:any = new Map();


// 해당 이벤트를 받고 콜백 함수를 실행함
export const socketInfoReceived = (cbType:any, cb:any) => {
    cbMap.set(cbType, cb);
    
    if (socket.hasListeners("message")) {
      socket.off("message");
    }
  
    socket.on( "message", (ret:any) => {
      for (const [, cbValue] of cbMap) {
        cbValue(null, ret);
      }
    });
  };

  export const disconnectSocket = () => {
    if (socket == null || socket.connected === false) {
      return;
    }
    socket.disconnect();
    socket = undefined;
  };

  