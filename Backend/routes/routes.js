const express = require('express')
const { testNode, getPosts, addProduct, getProduct, updateProduct, getProducts, deleteProduct } = require('../controllers/test')
const { login, token, logout, register, handleRefreshToken, addRole } = require('../controllers/auth')
const { validateToken, adminOnly, memberOnly } = require('../middlewares/validationHeader')
const { signup, signin } = require('../controllers/authNew')
const { insertCategory, getCategories } = require('../controllers/category')
const { createCommunity, getCommunities } = require('../controllers/community')
const router = express.Router()

// jwt
// router.post('/login', login)
// router.post('/token', token)
// router.post('/register', register)
// router.get('/refresh', handleRefreshToken)

//test api
router.get('/test', validateToken ,testNode)
router.get('/posts', validateToken, adminOnly, getPosts)
router.post('/api/products',addProduct)
router.get('/api/products',getProducts)
router.get('/api/product/:id',getProduct)
router.put('/api/product/:id', updateProduct)
router.delete('/api/product/:id', deleteProduct)
router.put('/role',adminOnly, addRole)

//auth
router.post('/newregister', signup)
router.post('/newlogin', signin)
router.delete('/logout', logout)

//category
router.post('/category/insert', insertCategory)
router.get('/categories/get', getCategories)

//community
router.post('/community/create', createCommunity)
router.get('/communities/get', getCommunities)



module.exports = router