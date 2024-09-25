const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];
let messageBuffer = [];  // Buffer to store messages

wss.on('connection', function connection(ws) {
    clients.push(ws);
    console.log("New client connected");

    // Send the current buffer to the new client
    if (messageBuffer.length > 0) {
        messageBuffer.forEach(message => {
            ws.send(message);
        });
    }

    // Broadcast changes to all connected clients
    ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    
    // Check if the client is requesting the current buffer
    if (data.type === 'requestBuffer') {
        console.log('Client requested current buffer');
        messageBuffer.forEach(msg => ws.send(msg));  // Send the buffer to the requesting client
    } else {
        console.log('Received:', message);

        // Store the message in the buffer and broadcast to all other clients
        messageBuffer.push(message);

        clients.forEach(function(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
});


    // Handle client disconnection
    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
        console.log("Client disconnected");
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
