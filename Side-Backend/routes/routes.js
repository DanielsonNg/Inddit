const express = require('express')
const { testNode, getPosts, getProducts, addProducts, getProduct } = require('../controllers/test')
const { login, token, logout } = require('../controllers/auth')
const { validateToken } = require('../middlewares/validationHeader')
const router = express.Router()

router.get('/test', testNode)
router.get('/posts', validateToken, getPosts)
router.post('/login', login)
router.post('/token', token)
router.delete('/logout', logout)

router.post('/api/products',addProducts)
router.get('/api/products',getProducts)
router.get('/api/product/:id',getProduct)

module.exports = router