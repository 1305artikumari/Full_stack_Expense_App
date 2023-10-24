const express = require("express");
const expenseController = require("../controllers/expenseController");
const router = express.Router();

router.get("/", expenseController.getexpense);
router.post("/", expenseController.postexpense);
router.post("/:id", expenseController.dltexpense);
router.get("/edit/:id", expenseController.updateexpense);
router.get("/:id", expenseController.getbyidexpense);


module.exports = router;
