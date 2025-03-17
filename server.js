const express = require('express');
const http = reqiuire('http')
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let document = "";
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.send(JSON.stringify({type: 'init', data:document}));

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            if(parsedMessage.type === 'update') {
                document = parsedMessage.data;
                wss.client.forEach((client) =>{
                    if(clients.readyState === WebSocket.OPEN) {
                         client.send(JSON.stringify({type: 'update', date: document}));
                    }
                });
            }
        }catch(error) {
            console.error('Enter parsing message',error);
        }
    });
    
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = 500;
server.listen(PORT, () => {
    console.log('Server is listening on port ${PORT}');
});
