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
    req.session.userid = {...user}
    res.status(200).send(req.session.userid)
}

const login = async (req, res) => {
    const {username, password} = req.body
    const db = req.app.get('db');
    const foundUser = await db.find_user([username, password])
    user = foundUser[0]
        if(!user){
            return res.status(401).send('Incorrect credentials, try again!')
        }
    req.session.userid = {...user}
    res.status(200).send(req.session.userid)
}

const logout = () => {
    req.session.destroy()
    res.sendStatus(200)
}

const getPostsByTitle = async (req, res) => {
    console.log(req.session.userid)
    const id = req.session.userid
    const {user, title} = req.query
    const db = req.app.get('db');
    if(user === 'true' && title !== ''){
        const posts = await db.find_by_title(['%' + title + '%'])
            res.status(200).send(posts)
    } else if (user === 'false' && title === ''){
        const posts = await db.find_non_user([id.id])
            res.status(200).send(posts)
    } else if (user === 'false' && title !== ''){
        const posts = await db.find_non_user_search([id.id, '%' + title + '%'])
            res.status(200).send(posts)
    } else {
        const posts = await db.get_all_posts()
            res.status(200).send(posts)
    }
}

// const getPosts = async (req, res) => {
//     const posts = await req.app.get('db').get_all_posts()
//     res.status(200).send(posts)

// }

const getPost = async (req, res) => {
    const {postid} = req.params
    const db = req.app.get('db')
    const post = await db.get_one_post([postid])
    delete password
        res.status(200).send(post)
}


const getPosts = (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_all_posts()
        .then((posts) => res.status(200).send(posts))
        .catch(error => {
            res.sendStatus(500)
            console.log(error)
        })
}

const createPost = async (req, res) => {
    const id = req.session.userid.id
    const {title, imgUrl, content} = req.body
    const db = req.app.get('db')
    await db.create_post([title, imgUrl, content, id])
        res.status(200).send('Post has been created!')
}

module.exports ={
    register,
    login,
    logout,
    getPostsByTitle,
    getPosts,
    getPost,
    createPost

}