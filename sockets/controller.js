const TicketControl = require('../models/ticket-control');
const ticketsControl = new TicketControl();
const socketsController = socket => {

    //? socket.on  Server recibe  data
    socket.on('next-ticket', (payload, callback) => {
        const nextticket = ticketsControl.nextTicket();
        socket.broadcast.emit('queve-tickets', ticketsControl.tickets);
        //?socket.emit server envia data
        callback(nextticket); //send feedback to client
    })
    socket.emit('queve-tickets', ticketsControl.tickets);
    socket.emit('last-ticket', ticketsControl.lastTicket);


    socket.on('serve-ticket', ({ siteassigned }, callback) => {
        if (!siteassigned) {
            return callback({
                ok: false,
                msg: 'siteassigned is required'
            })
        }

        const ticket = ticketsControl.serveTicket(siteassigned);
        socket.broadcast.emit('show-tickets', ticketsControl.ticketsOnScreen);
        socket.broadcast.emit('queve-tickets', ticketsControl.tickets);
        socket.emit('queve-tickets', ticketsControl.tickets);
        if (!ticket) {
            return callback({
                ok: false,
                msg: 'Tickets unavailable'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }

    });

    socket.emit('show-tickets', ticketsControl.ticketsOnScreen);

};

module.exports = {
    socketsController
}