import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  
    // Emitir señales
    // socket.emit('news', { hello: 'world' }) // El servidor manda un hello world

    // --- | Recibir señales | --- //

    socket.on('ingresar', (data:string) => {
        console.log("Señal detectada en socket.ts")
        console.log(data) // El cliente retorna data
        Ws.io.emit(`verificate-${data}`, { access: true })
    })
})
