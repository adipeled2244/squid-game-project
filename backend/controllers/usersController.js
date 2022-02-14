const User = require('../models/user');
exports.usersController = {
    async getUser(req, res) {
        let user;
        const { userId } = req.params;
        try {
            user = await User.findOne({ _id: userId });
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
    async checkIfuserNameNotExist(req,res){
        let user;
        const { userName } = req.params;
        try {
            user = await User.findOne({ userName });
        } catch (err) {
            res.status(500).send({ error: `Error get User: ${err}` });
            return;
        }
        if (user) {
            res.status(400).json({error:'useName is exist'});
        } else {
            res.status(200).json({ message: `Username is not exist` });
        }                                             
    },
    async getUsers(req, res) {
        let users;
        try {
            let colors = ['black', 'red', 'blue'];
            let lifeStatus = ['dead', 'alive', 'waiting to be killed'];
            if (req.query.colors) {
                colors = req.query.colors.split(',');
            }
            if (req.query.lifeStatus) {
                lifeStatus = req.query.lifeStatus.split(',');
            }
            users = await User.find({ $and: [{ 'color': { $in: colors } }, { 'lifeStatus': { $in: lifeStatus } }] });
            if (req.query.lifeStatus) {
                const lifeStatus = req.query.lifeStatus.split(',');
                users = await User.find({ $and: [{ 'color': 'blue' }, { 'lifeStatus': lifeStatus }] });
            } else if (req.query.colors) {
                const colors = req.query.colors.split(',');
                users = await User.find({ "color": { $in: colors } });
            }
        } catch (err) {
            res.status(500).json({ error: `Error get all users : ${err}` });
            return;
        }
        res.status(200).json(users);
    },
    async updateUser(req, res) {
        let resultUpdate;
        try {
            resultUpdate = await User.updateOne({ _id: req.params.userId }, req.body);
        } catch (err) {
            res.status(500).json({ error: `Error update user: ${err}` });
            return;
        }
        if (resultUpdate.matchedCount == 1) {
            res.status(200).json({ message: "The user updated" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    },
    async deleteUser(req, res) {
        let resultDelete;
        try {
            resultDelete = await User.deleteOne({ _id: req.params.userId }, );
        } catch (err) {
            res.status(500).json({ error: `Error deleting user: ${err}` });
            return;
        }
        if (resultDelete.deletedCount == 1) {
            res.status(200).json({ message: `User deleted` });
        } else {
            res.status(404).json({ error: `User not found` });
        }
    }
};