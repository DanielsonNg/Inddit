const express = require('express')
const { login, token, logout, register, handleRefreshToken, addRole } = require('../controllers/auth')
const { validateToken, adminOnly, memberOnly } = require('../middlewares/validationHeader')
const { signup, signin, getEmail, changePasswordRequest, changePassword } = require('../controllers/authNew')
const { insertCategory, getCategories } = require('../controllers/category')
const { createCommunity, getCommunities, getCommunity, joinCommunity, getPostsByCommunity, getPermission, leaveCommunity, deleteCommunity, editCommunity, membersToApprove, getMembers, promoteMember, demoteMember, kickMember, acceptMember, getHotCommunity, getHotPostByCommunity, getPostsByCommunityGuest } = require('../controllers/community')
const { createPost, getPosts, getPost, deletePost, editPost, getPostsGuest, postsToApprove, approvePost, likePost, unlikePost, getLike, savePost, unsavePost, getSave, getSavedPosts, getLikedPosts, getUserPosts, getHotPosts, getPostsByCategory } = require('../controllers/post')
const { createComment, getComments, editComment, deleteComment, likeComment, unlikeComment, getCommentsGuest } = require('../controllers/comment')
const { changeProfilePicture } = require('../controllers/user')
const router = express.Router()

// jwt
// router.post('/login', login)
// router.post('/token', token)
// router.post('/register', register)
// router.get('/refresh', handleRefreshToken)

//auth
router.post('/newregister', signup)
router.post('/newlogin', signin)
router.delete('/logout', logout)
router.get('/user/email/:id', getEmail)
router.post('/user/changePassword/request', changePasswordRequest)
router.post('/user/changePassword', changePassword)

//user
router.post('/user/changePicture', changeProfilePicture)

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
router.get('/community/members/:id', getMembers)
router.put('/community/member/promote/:id', promoteMember)
router.put('/community/member/demote/:id', demoteMember)
router.put('/community/member/kick/:id', kickMember)
router.put('/community/member/accept/:id', acceptMember)

router.get('/communities/hot', getHotCommunity)
router.get('/community/posts/hot/:id',getHotPostByCommunity)

//post
router.post('/posts', getPosts)
router.post('/post/create', createPost)
router.post('/post/:id', getPost)
router.delete('/post/:id', deletePost)
router.put('/post/:id', editPost)
router.get('/postToApprove/:id', postsToApprove)
router.put('/post/approve/:id', approvePost)
router.post('/post/like/:id', likePost)
router.post('/post/unlike/:id', unlikePost)
router.post('/post/track/like/:id', getLike)
router.post('/post/save/:id', savePost)
router.post('/post/unsave/:id', unsavePost)
router.post('/post/track/save/:id', getSave)
router.post('/posts/hot', getHotPosts)
router.post('/posts/category/:id', getPostsByCategory)


//post in user setting
router.get('/post/saved/:id', getSavedPosts)
router.get('/post/liked/:id', getLikedPosts)
router.get('/post/user/:id', getUserPosts)


//comment
router.post('/comment/:id', createComment)
router.post('/comments/:id', getComments)
router.post('/comment/edit/:id', editComment)
router.delete('/comment/:id', deleteComment)
router.post('/comment/like/:id', likeComment)
router.post('/comment/unlike/:id', unlikeComment)

//for guests
router.post('/postsGuest', getPostsGuest)
router.get('/postGuest/:id', getPost)
router.get('/commentsGuest/:id', getCommentsGuest)
router.get('/communityGuest/posts/:id', getPostsByCommunityGuest)


module.exports = router