
const express = require('express')
const { getAllPosts } = require('../controllers/posts')

const router = express.Router()

router.get('/', getAllPosts)

module.exports = router
