/** @format */

const router = require("express").Router();
const {
  createBulkTickets,
  createSingleTicket,
  getAllTickets,
  getTicketById,
  getTicketsbyUsername,
  updateTicketById,
  bulkUpdateTickets,
  deleteATicket,
  deleteAllTickets,
  drawResult,
} = require("../controllers/tickets");
// router.get("/:id"); // find by id
// router.patch("/:id"); // update by id
// router.delete("/:id"); // delete by id

router
  .route("/t/:id")
  .get(getTicketById)
  .put(updateTicketById)
  .delete(deleteATicket);

// router.get("/:username"); // find by username
// router.patch("/:username"); // bulk update
// router.delete("/:username"); // bulk delete

router
  .route("/u/:user")
  .get(getTicketsbyUsername)
  .put(bulkUpdateTickets)
  .delete(deleteAllTickets);

router.post("/bulk", createBulkTickets); // bulk create
router.get("/draw", drawResult);

// router.get("/"); // find all
// router.post("/"); // create one
router.route("/").get(getAllTickets).post(createSingleTicket);
module.exports = router;
