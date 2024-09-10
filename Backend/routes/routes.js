const express = require('express')
const { testNode, getPosts, addProduct, getProduct, updateProduct, getProducts, deleteProduct } = require('../controllers/test')
const { login, token, logout, register, handleRefreshToken, addRole } = require('../controllers/auth')
const { validateToken, adminOnly, memberOnly } = require('../middlewares/validationHeader')
const { signup, signin } = require('../controllers/authNew')
const { insertCategory, getCategories } = require('../controllers/category')
const { createCommunity } = require('../controllers/community')
const router = express.Router()

router.get('/test', validateToken ,testNode)
router.get('/posts', validateToken, adminOnly, getPosts)
router.post('/login', login)
// router.post('/token', token)
router.delete('/logout', logout)
router.post('/register', register)

router.get('/refresh', handleRefreshToken)

router.post('/api/products',addProduct)
router.get('/api/products',getProducts)
router.get('/api/product/:id',getProduct)
router.put('/api/product/:id', updateProduct)
router.delete('/api/product/:id', deleteProduct)

router.post('/newregister', signup)
router.post('/newlogin', signin)

router.post('/category/insert', insertCategory)
router.get('/categories/get', getCategories)

router.post('/community/create', createCommunity)

// router.put('/role',adminOnly, addRole)

module.exports = router