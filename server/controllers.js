// const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const {username, password} = req.body
    const db = req.app.get('db');
    const foundUser = await db.find_user([username])
        if(foundUser[0]){
            return res.status(409).send('Sorry, username is already taken!')
        }
    // const salt = bcrypt.genSaltSync(1)
    // const hashPassword = bcrypt.hashSync(password, salt)
    const registeredUser = await db.register_user([username, password])
    const user = registeredUser[0]
    req.session.user = {...user}
    res.status(200).send(req.session.user)
}

const login = async (req, res) => {
    const {username, password} = req.body
    const db = req.app.get('db');
    const foundUser = await db.find_user([username, password])
    user = foundUser[0]
        if(!user){
            return res.status(401).send('Incorrect credentials, try again!')
        }
    req.session.user = {...user}
    res.status(200).send(req.session.user)
}

const logout = () => {
    req.session.destroy()
    res.sendStatus(200)
}

module.exports ={
    register,
    login
}