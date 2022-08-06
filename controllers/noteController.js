const Notes = require('../models/noteModel')

const noteCtrl = {
    getNotes: async (req, res, next) => {

        try {

            // Encuentro la notas por su numero de id de usuario

            const notes = await Notes.find({ user_id: req.user.id })
            res.send(notes)

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    createNote: async (req, res, next) => {
        try {

            // Me llevo los datos del body

            const { title, content, date } = req.body

            // Creo una nueva nota con esos datos

            const newNote = new Notes({
                title: title,
                content: content,
                date: date,
                user_id: req.user.id,
                name: req.user.name
            })

            // Guardo esa nota 

            await newNote.save()
            res.send({ msg: "Created a Note" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteNote: async (req, res, next) => {
        try {
            // Encuentro la nota por ID y pido que se elimine

            await Notes.findByIdAndDelete(req.params.id)

            res.send({msg: "Deleted Note"})
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateNote: async (req, res, next) => {
        try {

            // Me llevo los datos del body

            const {title, content, date} = req.body

            // Encuentro la nota por su id y pido que se actalice en base a los datos del body 

            await Notes.findOneAndUpdate({_id: req.params.id}, {
                title,
                content,
                date
            })
            res.send({msg: "Updated Note"})
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getNote: async (req, res, next) => {
        try {
            // Obtengo la nota por su id
            
            const note = await Notes.findById(req.params.id)
            res.send(note)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

}

module.exports = noteCtrl