const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth')

const noteCtrl = require('../controllers/noteController')


router.get('/', auth, noteCtrl.getNotes)
router.post('/', auth, noteCtrl.createNote)

router.get('/:id', auth, noteCtrl.getNote)
router.put('/:id', auth, noteCtrl.updateNote)
router.delete('/:id', auth, noteCtrl.deleteNote)




    

module.exports = router