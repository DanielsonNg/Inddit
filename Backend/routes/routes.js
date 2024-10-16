const express = require('express')
// const { testNode, getPosts, addProduct, getProduct, updateProduct, getProducts, deleteProduct } = require('../controllers/test')
const { login, token, logout, register, handleRefreshToken, addRole } = require('../controllers/auth')
const { validateToken, adminOnly, memberOnly } = require('../middlewares/validationHeader')
const { signup, signin } = require('../controllers/authNew')
const { insertCategory, getCategories } = require('../controllers/category')
const { createCommunity, getCommunities, getCommunity, joinCommunity, getPostsByCommunity, getPermission, leaveCommunity, deleteCommunity, editCommunity, membersToApprove, getMembers, promoteMember, demoteMember, kickMember, acceptMember } = require('../controllers/community')
const { createPost, getPosts, getPost, deletePost, editPost, getPostsGuest, postsToApprove, approvePost } = require('../controllers/post')
const { createComment, getComments, editComment, deleteComment } = require('../controllers/comment')
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
router.post('/community/join/:id', joinCommunity)
router.post('/community/leave/:id', leaveCommunity)
router.post('/community/posts/:id', getPostsByCommunity)
router.post('/community/permission', getPermission)
router.delete('/community/:id', deleteCommunity)
router.put('/community/:id', editCommunity)
router.get('/community/membersToApprove/:id', membersToApprove)
router.get('/community/members/:id',getMembers)
router.put('/community/member/promote/:id', promoteMember)
router.put('/community/member/demote/:id', demoteMember)
router.put('/community/member/kick/:id', kickMember)
router.put('/community/member/accept/:id', acceptMember)

router.post('/posts', getPosts)
router.get('/postsGuest', getPostsGuest)
router.post('/post/create', createPost)
router.post('/post/:id', getPost)
router.delete('/post/:id', deletePost)
router.put('/post/:id', editPost)
router.get('/postToApprove/:id', postsToApprove)
router.put('/post/approve/:id', approvePost)

router.post('/comment/:id', createComment)
router.get('/comments/:id', getComments)
router.post('/comment/edit/:id', editComment)
router.delete('/comment/:id', deleteComment)


module.exports = router