const express = require('express');
const { createTrade, getTrades, getTradeById, methodNotAllowed } = require("../controllers/trades");

const router = express.Router();

router.route('/')
    .post(createTrade)
    .get(getTrades);

router.route('/:id')
    .get(getTradeById)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .patch(methodNotAllowed);

module.exports = router;
