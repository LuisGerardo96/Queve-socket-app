const path = require('path');
const fs = require('fs');
class Ticket {
    constructor(ticketnumber, siteassigned) {
        this.ticketnumber = ticketnumber;
        this.siteassigned = siteassigned;
    }
}
class TicketControl {
    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.ticketsOnScreen = [];
        this.start();
    }

    get toJson() {
        return {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            ticketsOnScreen: this.ticketsOnScreen
        };
    }

    start() {
        const { today, lastTicket, tickets, ticketsOnScreen } = require('../db/data.json')
        if (today === this.today) {
            this.tickets = tickets;
            this.lastTicket = lastTicket;
            this.ticketsOnScreen = ticketsOnScreen;
        } else {
            this.savedOnDb();
        }
    }
    savedOnDb() {
        const pathDB = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(pathDB, JSON.stringify(this.toJson));
    }
    nextTicket() {
        this.lastTicket += 1;
        const ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);
        this.savedOnDb();
        return ticket;
    }
    serveTicket(siteassigned) {

        //*Check if array has tickets
        if (this.tickets.length === 0) {
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.siteassigned = siteassigned;
        this.ticketsOnScreen.unshift(ticket);
        if (this.ticketsOnScreen.length > 4) {
            this.ticketsOnScreen.splice(-1, 1);
        }
        this.savedOnDb();
        return ticket;

    }

}
module.exports = TicketControl;