const express = require('express')
// const { testNode, getPosts, addProduct, getProduct, updateProduct, getProducts, deleteProduct } = require('../controllers/test')
const { login, token, logout, register, handleRefreshToken, addRole } = require('../controllers/auth')
const { validateToken, adminOnly, memberOnly } = require('../middlewares/validationHeader')
const { signup, signin } = require('../controllers/authNew')
const { insertCategory, getCategories } = require('../controllers/category')
const { createCommunity, getCommunities, getCommunity } = require('../controllers/community')
const { createPost, getPosts, getPost } = require('../controllers/post')
const { createComment, getComments } = require('../controllers/comment')
const router = express.Router()

// jwt
// router.post('/login', login)
// router.post('/token', token)
// router.post('/register', register)
// router.get('/refresh', handleRefreshToken)

//test api
// router.get('/test', validateToken ,testNode)
// router.get('/posts', validateToken, adminOnly, getPosts)
// router.post('/api/products',addProduct)
// router.get('/api/products',getProducts)
// router.get('/api/product/:id',getProduct)
// router.put('/api/product/:id', updateProduct)
// router.delete('/api/product/:id', deleteProduct)
// router.put('/role',adminOnly, addRole)

//auth
router.post('/newregister', signup)
router.post('/newlogin', signin)
router.delete('/logout', logout)

//category
router.post('/category/insert', insertCategory)
router.get('/categories/get', getCategories)

//community
router.post('/community/create', memberOnly, createCommunity)
router.get('/communities/get', getCommunities)
router.get('/community/:id', getCommunity)

router.get('/posts', getPosts)
router.post('/post/create', createPost)
router.get('/post/:id', getPost)

router.post('/comment/:id', createComment)
router.get('/comments/:id', getComments)


module.exports = router