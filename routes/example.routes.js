const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Server ok');
})

module.exports = router;