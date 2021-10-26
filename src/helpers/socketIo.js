import io from 'socket.io-client';

let userId = localStorage.getItem('userId')

export const socket = io('http://turbotaxi.ir:6060', {  transports : ["websocket"], query: `channelInfo=${userId},3,turboAABMohsen,100`})


// http://172.16.2.212:6060
