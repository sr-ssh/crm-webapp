import io from 'socket.io-client';

let userId = localStorage.getItem('userId')

export const socket = io('http://172.16.2.212:6060', {  transports : ["websocket"],query: `channelInfo=${userId},3,turboAABMohsen,100`})

