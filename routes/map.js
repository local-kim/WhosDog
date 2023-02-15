const express = require('express');
const router = express.Router();
const Map = require('../models/map');
const User = require('../models/user');
const Location = require('../models/location');
const { isLoggedIn, isNotLoggedIn, auth } = require('./middlewares');

router.post('/getStars', async (req, res, err) => {
  const { placeId } = req.body;
  if(placeId===undefined) return res.status(200).json({
    success:true, stars : 0
  })
  const Sum = await Map.sum( 'star',
    {where : { 
      locationId: placeId
    }});
  const Count = await Map.count({
    where : {
      locationId:placeId
    }
  })
  return res.status(200).json({
    success:true, stars : Sum/Count
  })
});

router.post('/getReviewList', async (req, res, err) => {
  const { placeId } = req.body;
  console.log(placeId);
  await Map.findAll({
    where:{
      locationId:placeId
    },include:[
    {
      model:User,
      required:false,
      attributes:['nick']
    }],
    order: [['createdAt', 'DESC']]
  }).then( data => {
  
    return res.status(200).json({
      success:true, review:data
    })
  })
});

router.post('/createReview', isLoggedIn, async (req, res, err) => {
  const { id } =req.user;
  const { locationId, star, review } = req.body;
  console.log(locationId, star, review, id);
  await Map.create({
    locationId:locationId,
    star:star,
    review:review,
    writer:id
  }).then(() => {
    return res.status(200).json({success:true});
  }).catch( err => {
    return res.status(500).json({success:false});
  })
})


module.exports = router;

