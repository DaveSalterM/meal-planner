const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const reviewRoutes = require('./reviewRoutes');
const jwt = require('jsonwebtoken');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/reviews', reviewRoutes);

router.get("/checkToken",(req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        const tokenData = jwt.verify(token,process.env.TOKEN_SECRET);
        res.json({
            validToken:true,
            userId:tokenData.id
        })
    } catch (error) {
        console.log(error)
        res.json({validToken:false})
    }
})

module.exports = router;
