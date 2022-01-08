const router = require('express').Router()
const User = require('../models/User')
require('dotenv').config()
const { verifyToken, verifyTokenAndAuthorisation} = require('../middlewares/verifyToken')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const { body, validationResult } = require('express-validator')

//create a new user

router.post(
  '/create',

  body('email').isEmail().withMessage('Invalid Email'),
  body('username').notEmpty().withMessage('username required'),
  body('email').notEmpty().withMessage('email required'),
  body('password').notEmpty().withMessage('password required'),
  body('password').isLength({ min: 5 }).withMessage('Password too short!'),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET,
      ).toString(),
    })

    try {
      const savedUser = await newUser.save()
      const { password, ...others } = savedUser._doc
      return res.status(200).json(others)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
)

// login process

router.post(
  '/login',
  body('email').isEmail().withMessage('Invalid Email'),
  body('email').notEmpty().withMessage('email required'),
  body('password').notEmpty().withMessage('password required'),
  body('password').isLength({ min: 5 }).withMessage('Password too short!'),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      let user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(401).json('No account!')
      }

      const validPwd = CryptoJS.AES.decrypt(user.password, process.env.SECRET)
      const pwd = validPwd.toString(CryptoJS.enc.Utf8)
      if (pwd !== req.body.password) {
        return res.status(401).json('wrong login credentials')
      }

      // jwt access token
      const AccessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET_PHRASE,
        { expiresIn: '7d' },
      )

      await user.updateOne({ AccessToken: AccessToken }, { new: true })
      const { password, ...others } = user._doc
      return res.status(200).json({ ...others, AccessToken })
    } catch (err) {
      return res.status(500).json(err)
    }
  },
)

router.get('/logout', verifyTokenAndAuthorisation, async(req, res) => {
    try{
         await User.findOneAndUpdate(
            { _id: req.user._id },
            { AccessToken: '' },{new:true}
        )   
        return res.status(500).json(err)      

    }
    catch(err){
        return res.status(500).json(err)
    }
                     
})

module.exports = router
