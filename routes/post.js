const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn, auth } = require('./middlewares');
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.get('/getList', isLoggedIn, async(req, res, err) => {
  const { id, area1, area2, area3 } = req.user;
  const keyword =req.query.keyword;

  await Post.findAll({
    where: {
      area1:area1, 
      area2:area2, 
      area3:area3,
      title:{
        [Op.like]: '%'+keyword+'%'
      }
    },
    order: [['createdAt', 'DESC']],
    include:[
      {
        model:User,
        required:false,
        attributes:['nick']
      }],
  })
  .then( result => {
      return res.status(200).json({
        success:true, result:result, id: id})
  })
  
});

router.post('/create', isLoggedIn, async (req, res, err) => {
  const { area1, area2, area3, id } = req.user;
  const { content, title } = req.body;
  await Post.create({
    title: title,
    content: content,
    area1: area1,
    area2: area2,
    area3: area3,
    writer: id,
  }).then(() => {
    return res.status(200).json({success:true});
  }).catch( err => {
    return res.status(500).json({success:false});
  })
})

router.post('/postView', isLoggedIn, async (req, res, err) => {
  const {id} = req.body;
  const post = await Post.findOne({
    where:{
      id:id
    },include:[
      {
        model:User,
        required:false,
        attributes:['nick']
      }]
  });
  const comments = await Comment.findAll({
    where:{
      posting:id
    }, include:[
     {
        model:User,
        required:false,
        attributes:['nick']
     }],
     order: [['createdAt', 'DESC']]
  });
  return res.status(200).json({
    success:true, post:post, comments:comments
  })
})

router.post('/createComment', isLoggedIn, async(req, res, err) => {
  const {id} = req.user;
  const {comment, posting} = req.body;
  await Comment.create({
    comment:comment,
    commenter:id,
    posting:posting
  }).then(() => {
    return res.status(200);
  })
})

router.delete('/deletePost', isLoggedIn, async(req, res, err) => {
  const {id} = req.user;
  const {postId} = req.body;
  console.log(id, postId);
  await Post.destroy({
    where:{
      id: postId,
      writer:id
    }
  }).then(() => {
    return res.status(200).json({
      success:true
    });
  })
})

router.delete('/deleteComment', isLoggedIn, async(req, res, err) => {
  const { id } = req.user;
  const { commentId } = req.body;
  await Comment.destroy({
    where:{
      commenter:id,
      id:commentId
    }
  }).then(() => {
    return res.status(200).json({
      success:true
    });
  })
})

module.exports = router;

