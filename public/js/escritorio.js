const title = document.querySelector('#lbltitle');
const btnServeTicket = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblTicketsPending = document.querySelector('#lblPendientes');
const urlparams = new URLSearchParams(window.location.search);
const siteassigned = urlparams.get('escritorio');
title.innerText = `Escritorio ${siteassigned}`;
const socket = io();

divAlert.style.display = 'none';
socket.on('connect', () => {
    btnServeTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnServeTicket.disabled = true;
});
socket.on('queve-tickets', (tickets) => {
    if (tickets.length === 0) {
        lblTicketsPending.innerText = 0;
    }
    divAlert.style.display = 'none';
    lblTicketsPending.innerText = `${tickets.length} Tickets `;
})

btnServeTicket.addEventListener('click', () => {
    socket.emit('serve-ticket', { siteassigned }, ({ ok, ticket, msg }) => {
        if (!ok) {
            divAlert.style.display = '';
            console.log(msg);
            lblTicket.innerText = 'Nadie';
        } else {
            lblTicket.innerText = `Ticket ${ticket.ticketnumber}`;
        }

    });
});