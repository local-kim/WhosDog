exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(200).json({message:'로그인 필요', success:false});
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next(); 
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.status(403).json({message: message});
    }
}

