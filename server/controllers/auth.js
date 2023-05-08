import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

// const bcrypt = require("bcrypt")

/* REGISTER USER */
/* making  a call to mongodb, so has to be async */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        /* to encrypt the password */
        // const salt = bcrypt.genSalt();
        // const passwordHash = await bcrpyt.hash(password, salt);
        // const passwordHash = "examplehash"

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); /* make a json version of the new user so the frontend can recieve the response */
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        if (!(password === user.password)) {
            return res.status(400).json({ msg: "Invalid credentials. " })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
