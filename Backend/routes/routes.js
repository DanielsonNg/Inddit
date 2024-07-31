const express = require('express')
const { testNode, getPosts, addProduct, getProduct, updateProduct, getProducts, deleteProduct } = require('../controllers/test')
const { login, token, logout, register } = require('../controllers/auth')
const { validateToken } = require('../middlewares/validationHeader')
const router = express.Router()
router.get('/test', testNode)
router.get('/posts', validateToken, getPosts)
router.post('/login', login)
router.post('/token', token)
router.delete('/logout', logout)
router.post('/register', register)

router.post('/api/products',addProduct)
router.get('/api/products',getProducts)
router.get('/api/product/:id',getProduct)
router.put('/api/product/:id', updateProduct)
router.delete('/api/product/:id', deleteProduct)

module.exports = router