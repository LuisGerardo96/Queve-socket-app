const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1')
const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2')
const lblTicket3 = document.querySelector('#lblTicket3')
const lblEscritorio3 = document.querySelector('#lblEscritorio3')
const lblTicket4 = document.querySelector('#lblTicket4')
const lblEscritorio4 = document.querySelector('#lblEscritorio4')
const socket = io();

socket.on('show-tickets', (ticketsonscreen) => {
    const [ticket1, ticket2, ticket3, ticket4] = ticketsonscreen;
    const soundnotification = new Audio('./audio/new-ticket.mp3');
    soundnotification.play();
    if (ticket1) {
        lblTicket1.innerText = `Ticket ${ticket1.ticketnumber}`;
        lblEscritorio1.innerText = `Escritorio ${ticket1.siteassigned}`;
    }
    if (ticket2) {
        lblTicket2.innerText = `Ticket ${ticket2.ticketnumber}`;
        lblEscritorio2.innerText = `Escritorio ${ticket2.siteassigned}`;
    }
    if (ticket3) {
        lblTicket3.innerText = `Ticket ${ticket3.ticketnumber}`;
        lblEscritorio3.innerText = `Escritorio ${ticket3.siteassigned}`;
    }

    if (ticket4) {
        lblTicket4.innerText = `Ticket ${ticket4.ticketnumber}`;
        lblEscritorio4.innerText = `Escritorio ${ticket4.siteassigned}`;
    }
});