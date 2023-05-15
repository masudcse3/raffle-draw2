/** @format */

const collection = require("../model/tickets");

exports.createSingleTicket = (req, res) => {
  const { username, price } = req.body;

  const ticket = collection.create(username, price);
  if (!ticket) {
    return res.status(403).json({ message: "Provide correct data" });
  }
  return res.status(201).json({
    message: "Ticket created successfull",
    ticket,
  });
};

exports.createBulkTickets = (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = collection.bulkCreate(username, price, quantity);
  res.status(201).json({ message: "Tickets created successfull", tickets });
};

exports.getAllTickets = (_req, res) => {
  const tickets = collection.findAll();
  res.status(200).json({ message: "All created tickets", tickets });
};
exports.getTicketById = (req, res) => {
  const { id } = req.params;
  const ticket = collection.findById(id);
  res.status(200).json(ticket);
};
exports.getTicketsbyUsername = (req, res) => {
  const { user } = req.params;
  const tickets = collection.findByUsername(user);
  res.status(200).json({ message: "Tickets found", tickets });
};

exports.updateTicketById = (req, res) => {
  const id = req.params.id;
  const { username, price } = req.body;
  const ticket = collection.updateById(id, { username, price });
  res.status(200).json({ message: "Ticket updated successfull", ticket });
};

exports.bulkUpdateTickets = (req, res) => {
  const { user } = req.params;
  const { username, price } = req.body;
  const tickets = collection.bulkUpdate(user, { username, price });
  res.status(200).json({ message: "Tickets updated successfull", tickets });
};
exports.deleteATicket = (req, res) => {
  const id = req.params.id;
  collection.deleteById(id);
  res.status(203).json({ message: "Success" });
};
exports.deleteAllTickets = (req, res) => {
  const { user } = req.params;
  collection.bulkDelete(user);
  res.status(203).json({ message: "Success" });
};
exports.drawResult = (req, res) => {
  const { wc } = req.query;
  const winners = collection.draw(wc);
  res.status(200).json({ message: "Winners found", winners });
};
