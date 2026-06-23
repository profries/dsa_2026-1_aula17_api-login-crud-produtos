const express = require("express");
const router = express.Router();

router.get('/', (req, res) => res.sendStatus(404));
router.post('/', (req, res) => res.sendStatus(404));
router.get('/:id', (req, res) => res.sendStatus(404));
router.put('/:id', (req, res) => res.sendStatus(404));
router.delete('/:id', (req, res) => res.sendStatus(404));

module.exports = router;