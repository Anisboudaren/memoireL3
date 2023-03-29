const createError = require('http-errors')
const User = require('../models/user.model')

const addNewUser = async (req , res , next) =>{
    const newUser = new User(req.body)

    const {error} = newUser.validation(req.body)

    if(error) {
        return res.status(400).json({
            result : false , 
            message : error ,
        });

    }else {
        try {
            const result = await newUser.save()
                if(result) {
                    res.status(201).json({
                        result : true ,
                        message : 'new user has been added'
                    })
                }else {
                    res.status(400).json({
                        result : false , 
                        message : "something went wrong while saving the user"
                    })
                }
        } catch (e) {
           next(createError(e))
        }
    }
}



module.exports = {
    addNewUser
}