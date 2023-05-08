import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; /* getting the id from the query string */
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params; /* getting the id from the query string */
        const user = await User.findById(id);

        // make mulitple api calls to get the db to get all the friends
        const friends = await Promise.all(
            // grab the id of each friend and then find that friend in the Users
            user.friends.map((id) => User.findById(id))
        );
        // format 'friends' so the frontend can understand it
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        console.log("3")
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        //removing a friend
        if (user.friends.includes(friendId)) {
            // filter is a java function that lets you copy the friend in the array as long as the id is not the friendId we want to remove
            user.friends = user.friends.filter((id) => id !== friendId);
            // remove the user from the friends list
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        // adding a friend
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}