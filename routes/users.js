const { Router } = require("express")

module.exports = Router()
  .get("/")
  .get("/new")
  .get("/:id")
  .get("/:id/edit")
  .patch("/:id")
  .delete("/:id")
