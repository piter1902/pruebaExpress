import logger from '@poppinss/fancy-logs';
import Express from 'express';
import User from '../models/User';

const createNewUser = (req: Express.Request, res: Express.Response) => {
    logger.info("Creating a new user");
    const user = new User({
        name: req.body.name,
        years: req.body.years
    });
    res.send(user);
    user.save();
};

const getAllUsers = async (req: Express.Request, res: Express.Response) => {
    res.status(200).send(await User.find().exec());
}

const getUserByUID = async (req: Express.Request, res: Express.Response) => {
    const uid = req.params.uid;
    logger.info(`Getting user with uid = ${uid}`);
    // Obtenemos al usuario de la bd
    const user = await User.findById(uid).exec();
    if(user != null) {
        res.status(200).json(user);
    } else {
        res.status(404).send();
    }
};

export default {
    getAllUsers,
    createNewUser,
    getUserByUID
}