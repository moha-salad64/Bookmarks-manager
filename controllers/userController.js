const bcrypt = require('bcrypt')
const User = require('../models/userModel');

//creating user
exports.createUser = async (req , res) =>{
    try{
        const {username ,  password , email , role ='user'} = req.body;

        if(!username || !password || !email){
            return res.status(400).json({
                message:'username ,  password , email are required'
            })
        }

        const newUser = new User({ username , password , email , role: role,});
        await newUser.save()
        res.status(200).json({message: 'user creation successfully' , user: newUser});
    }catch(error){
        console.log('creating user failed' , error);
        res.status(500).json('user can not create');
    }
}
exports.getUsers = async (req ,res) =>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        console.log(error);
        res.status(500).send('user can not found!')
    }
}

exports.updateUseer = async(req , res) =>{
    try{
        const {userId} = req.params;
        const updateUser = req.body;
        userUpdated = await User.findOneAndUpdate(
            userId,
            updateUser,
        );
        if(!userUpdated){
            return res.status(404).json({
                message:'user can not found',
            });
        }
        res.json({
            message: "user updated successfully",
            user: userUpdated,
        })
    }catch(error){
        console.log('updating user error', error);
        res.json({
            message:'user updated error',
        })
    }
}


exports.deleteUser = async (req , res) =>{
    try {
        const {id} = req.params;
        const deleteuser = await User.findOneAndDelete(id);
        if(!deleteuser){
          return res.status(404).json({ message: 'user is not found!'})
        }else{
            res.json({message: "user was deleted!", user: deleteuser})
        }
    } catch (error) {
        console.log('user deleted error' , error);
        res.status(500).json({ message: 'deleted user error' })
    }

}


exports.getUserLogin = async (req , res) =>{
    try {
        const {email , password} = req.body;
        const userlogin = await User.findOne({email});
        if(!userlogin){
            return res.status(404).json({
                message: 'user not found'
            })
        }

        //compate password and hashed password
        const isMatch = await bcrypt.compare(password , userlogin.password);
        if(!isMatch){
            return res.status(401).json({
                message: 'Invaid login user'
            })
        }
        res.status(200).json({
            message: 'Login successful' , userlogin
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error Logging' , error: error.message
        })
    }
}
