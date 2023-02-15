const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const request = require('request-promise-native')
const dotenv = require('dotenv');

dotenv.config();

const { isLoggedIn, isNotLoggedIn, auth } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) =>{
    const { email, nick, password } = req.body;
    try{
        const exUser = await User.findOne({ where: {email}});
        if(exUser){
            return res.json({success:false, message: '이미 해당하는 유저가 있습니다.'});
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick: nick,
            password:hash,
        });
        return res.status(200).json({
            success:true
        })
    } catch (error){
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            next();
        });
    })(req, res, next);
});

const requestAddrApi = async (options) => {
    return new Promise( resolve => {
        request(options, async (err, res, body) => {
            if(err){
                return res.status(err.errorCode).json({
                    success:true, message:err.message,
                })
            }   
            resolve(JSON.parse(body).results[0].region);
        })
    })
};

router.post('/login', async (req, res, next) => {
    // 유저의 좌표가 기존과 같으면 DB상의 행정구역명을 그대로 받아오고, 아니면 api request를 보내 새로 행정구역명을 받아와 리턴
    const { email,id } = req.user;
    const { latitude, longitude } = req.body;
    try{
        const exUser = await User.findOne({ where: {email}});
        if(exUser.latitude != latitude || exUser.longitude !=longitude){
            let url = 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords='+`${longitude},${latitude}`+'&orders=addr&output=json';
            let options = {
                url: url,
                method: 'GET',
                headers: {
                    'X-NCP-APIGW-API-KEY-ID':process.env.NAVER_ID,
                    'X-NCP-APIGW-API-KEY':process.env.NAVER_SECRET,
                },
            };

            await requestAddrApi(options)
            .then( async(data) => {
                console.log(data);
                try{
                    await User.update({
                        latitude:latitude,
                        longitude:longitude,
                        area1:data.area1.name,
                        area2:data.area2.name,
                        area3:data.area3.name
                    },{
                        where: {
                            id:id
                        }
                    });
                } catch (err){
                    console.error(err);
                }
            })
        }
        return res.status(200).json({
            loginSuccess:true, 
            location: {latitude:latitude, longitude:longitude},
        })  
    } catch (error){
        console.error(error);
    }
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.clearCookie('connect.sid', {path:'/'});
    console.log("test");
    return res.status(200).json({success:true})
});


router.get('/userinfo', isLoggedIn, (req, res) => {
    return res.status(200).json({
        success:true,
        id:req.user.id,
        nickname:req.user.nick,  
        latitude: req.user.latitude,
        longitude: req.user.longitude,
    })
})

router.post('/updateuserinfo', isLoggedIn, async (req, res, next) => {
    const { email } = req.user;
    const { nick, password } = req.body;
    console.log(nick, email);
    try{
        const exUser = await User.findOne({ where: {email}});
        if(!exUser){
            return res.json({success:false, message: '잘못된 요청입니다.'});
        }
        const hash = await bcrypt.hash(password, 12);
        if(password === ""){
            await User.update({
                nick:nick,
            },{
                where: {
                    email:email
                }
            });
        }
        else {
            await User.update({
                nick:nick,
                password:hash,
            },{
                where: {
                    email:email
                }
            });
        }
        return res.status(200).json({
            success:true
        })
    } catch (error){
        console.error(error);
        return next(error);
    }
});

router.post('/setlocation', isLoggedIn, async (req, res, next) => {
    // 유저의 좌표가 기존과 같으면 DB상의 행정구역명을 그대로 받아오고, 아니면 api request를 보내 새로 행정구역명을 받아와 리턴
    const { email,id } = req.user;
    const { latitude, longitude } = req.body;
    try{
        const exUser = await User.findOne({ where: {email}});
        if(exUser.latitude != latitude || exUser.longitude !=longitude){
            let url = 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords='+`${longitude},${latitude}`+'&orders=addr&output=json';
            let options = {
                url: url,
                method: 'GET',
                headers: {
                    'X-NCP-APIGW-API-KEY-ID':process.env.NAVER_ID,
                    'X-NCP-APIGW-API-KEY':process.env.NAVER_SECRET,
                },
            };
            await request(options, async (err, res, body) => {
                const data = JSON.parse(body).results[0].region;
                console.log(data.area2.name,data.area1.name);
                if(err){
                    return res.status(err.errorCode).json({
                        success:true, message:err.message,
                    })
                }        
                await User.update({
                    latitude:latitude,
                    longitude:longitude,
                    area1:data.area1.name,
                    area2:data.area2.name,
                    area3:data.area3.name
                },{
                    where: {
                        id:id
                    }
                });
                
            })
            return res.status(200);        
        }
    } catch (error){
        console.error(error);
    }
})

router.get('/kakao',  passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.json({success:true});
});

module.exports = router;