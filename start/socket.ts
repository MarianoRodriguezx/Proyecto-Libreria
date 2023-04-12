import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  
    // Emitir señales
    socket.emit('news', { hello: 'world' }) // El servidor manda un hello world

    // --- | Recibir señales | --- //
    // Ejemplo
    socket.on('my other event', (data) => {
        console.log(data) // El cliente retorna data
    })

    //Leer QR
    socket.on('getQR', (data) => {
        console.log(data) // Debe recibir QR y status true
        /* if (data.status) {
            
        } */
    })
})
