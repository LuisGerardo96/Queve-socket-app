const lblNewTicket = document.querySelector('#lblNuevoTicket');
const btnCreate = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCreate.disabled = false;
});

socket.on('disconnect', () => {
    btnCreate.disabled = true;
});

socket.on('last-ticket', (lastticket) => {
    setTimeout(() => {
        lblNewTicket.innerText = `Ticket ${lastticket}`;
    }, 2000)
});

btnCreate.addEventListener('click', () => {

    socket.emit('next-ticket', null, (ticket) => {
        lblNewTicket.innerText = `Ticket No ${ticket.ticketnumber}`;
    });
});