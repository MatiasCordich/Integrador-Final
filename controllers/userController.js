const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const useCtrl = {

    registerUser: async (req, res, next) => {

        try {

            const {username, email, password} = req.body

            // Encontrar usuario por Eamil
            const user = await Users.findOne({email: email})

            // Validar si existe el email

            if (user) {
                return res.status(400).send({msg: "Email existente"})
            }

            // Hashear la password

            const passwordHash = await bcrypt.hash(password,10)

            // Crear nuevo usuario

            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash
            })

            // Guardar el nuevo usuario

            await newUser.save()

            res.send({msg:'Te has registrado exitosamente'})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }

    },
    loginUser: async (req, res, next) => {
        try {

            // Extrar el eamil y el password del body

            const {email, password} = req.body

            // Encontrar un usuario por el email
            const user = await Users.findOne({email:email})

            // Corroboar si el usuario existe

            if(!user) {
                return res.status(400).send({msg: "Usuario inexistente"})
            }

            // Matchear 

            const isMatch = await bcrypt.compare(password, user.password)

            // Validar el match

            if(!isMatch) {
                return res.status(400).send({msg:"Contraseña incorrecta"})
            }

            // Validad el login, si es succes que me cree el token

            const payload = {id: user._id, name: user.username}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:"1d"})

            res.send({ token })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    verifiedUser: async (req, res, next) => {
      try {

        // Extraigo el token de mi local storage

        const token = req.header("Authorization")

        if (!token) {
            return res.send(false)
        }

        // Valido mediante jsonwebtoken

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
          if (err) {
            return res.send(false)
          }

          // Extraigo usario y verifico si existe

          const user = await Users.findById(verified.id)
          if (!user) {
            return res.send(false)
          }

          return res.send(true)
        })
      } catch (error) {
        return res.status(500).send({msg: error.message})
      }
    }
}

module.exports = useCtrl