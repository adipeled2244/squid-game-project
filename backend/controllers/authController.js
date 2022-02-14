const User = require('../models/user');
const bcrypt = require("bcryptjs");
const peopleImgApi = require('../API/peopleImgApi');

exports.authController = {
    async login(req, res) {
            let user;
            const { userName, password } = req.body;
            if(!userName || !password){
                return res.status(400).json({ error: `invalid userName or password` });
            }
            try {
                user = await User.findOne({ userName });
                
                if(!user){
                   return res.status(404).json({ error: `User not found`});
                }
                const passwordIsValid = bcrypt.compareSync(
                    password,
                    user.password
                );
            
                if (!passwordIsValid) {
                    return res.status(401).send({
                    error: "Invalid Password!",
                    });
                }

            } catch (err) {
                res.status(500).send({ error: `Error get User: ${err}` });
                return;
            }
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: `User not found` });
            }
    
        },
    
    async signup(req, res) {
        const newUser = new User(req.body);
        newUser.password = bcrypt.hashSync(req.body.password, 8);
        try {
            checkUserName = await User.findOne({ userName: newUser.userName });
            if (checkUserName) {
               return res.status(409).json({ error: `UserName is already exist` });
            } 
            if (newUser.color == "blue") {
                newUser.img = await peopleImgApi.getPersonImg();
            }
            else if (newUser.color == "red") {
                if(newUser.shape=='circle'){
                    newUser.img = 'https://cdn.discordapp.com/attachments/836203535288238130/942072578506391602/krug-definitivno-2.png'
                }
                else if(newUser.shape=='triangle'){
                    newUser.img = 'https://media.discordapp.net/attachments/836203535288238130/942072009188319342/squid-game-udkl-dningsdragt---trekant.png'
                }
                else if(newUser.shape=='square'){
                    newUser.img = 'https://media.discordapp.net/attachments/836203535288238130/942073340204572732/squid-game-2021-guard-tracksuit.png'
                }
            }
            else if (newUser.color == "black") {
                newUser.img ='https://cdn.discordapp.com/attachments/836203535288238130/941657172603961355/022494a14a162ce997eee0984ea66423.png';
            }
            let userToSave = await newUser.save();
            res.status(200).json(userToSave);

        } catch (err) {
            res.status(500).json({
                error: ` ${err}`
            });
            return;
        }
    }

};