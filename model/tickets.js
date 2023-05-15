/** @format */
const Ticket = require("./Ticket");
const { readFile, writeFile } = require("../utils/readWrite");
const tickets = Symbol("tickets");
class TicketCollection {
  constructor() {
    (async function () {
      this[tickets] = await readFile();
    }).call(this);
  }
  create(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    writeFile(this[tickets]);
    return ticket;
  }
  findAll() {
    return this[tickets];
  }
  findById(id) {
    return this[tickets].find((ticket) => ticket.id === id);
  }
  findByUsername(username) {
    return this[tickets].filter((ticket) => ticket.username === username);
  }
  updateById(id, ticketBody) {
    const ticket = this.findById(id);
    ticket.username = ticketBody.username ?? ticket.username;
    ticket.price = ticketBody.price ?? ticket.price;
    ticket.updatedAt = new Date();
    writeFile(this[tickets]);
    return ticket;
  }
  deleteById(id) {
    const index = this[tickets].findIndex((ticket) => ticket.id === id);
    if (index === -1) {
      return false;
    } else {
      this[tickets].splice(index, 1);
      writeFile(this[tickets]);
      return true;
    }
  }
  bulkDelete(username) {
    const updatedTicket = this[tickets].filter(
      (ticket) => ticket.username !== username
    );
    writeFile(updatedTicket);
    return true;
  }
  bulkCreate(username, price, quantity) {
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      tickets.push(ticket);
    }

    return tickets;
  }
  bulkUpdate(username, ticketBody) {
    const tickets = this.findByUsername(username);
    return tickets.map((ticket) => this.updateById(ticket.id, ticketBody));
  }
  draw(winnerCount) {
    const winnerIndexes = new Array(winnerCount);
    let winnerIndex = 0;
    while (winnerIndex < winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length);
      if (!winnerIndexes.includes(ticketIndex)) {
        winnerIndexes[winnerIndex] = ticketIndex;
        winnerIndex++;
        continue;
      }
    }
    const winners = winnerIndexes.map(
      /**
       * @param {index} index
       */
      (index) => this[tickets][index]
    );
    return winners;
  }
}
const collection = new TicketCollection();
module.exports = collection;
