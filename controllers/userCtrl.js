// const fs = require("fs");
const User = require("../models/userModel");

// const data = fs.readFileSync(`${__dirname}/../data/users.json`, "utf-8");
// const users = JSON.parse(data);

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            users,
        });
    } catch(err) {
        res.status(401).json({
            status: 'fail',
            message: err,
        });
    }
    // res.status(200).json({
    //     status: "success",
    //     users: users,
    // });
};

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({
            status: "success",
            user,
        });
    } catch(err) {
        res.status(401).json({
            status: "fail",
            message: "Something went wrong",
            error: err,
        });
    }
    // console.log(req.params);
    // const id = req.params.id;
    // var user = users.find((el) => el._id == id);

    // if (!user) {
    //     return res.status(200).json({
    //         status: "fail",
    //         message: "User doesn't exist",
    //     });
    // }

    // res.status(200).json({
    //     status: "success",
    //     requestAt: req.requestTime,
    //     user,
    // });
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        res.status(200).json({
            status: "success",
            req: req.requestTime,
            user,
        });
    } catch(err) {
        console.log(err);
        res.status(401).json ({
            status: "fail",
            message: `${err.message} ${err.name}`,
        });
    }
    // console.log(req.body);

    // const loginData = req.body;

    // var user = users.find((el) => el.email == loginData.email);

    // if (!user) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: "User doesn't exist",
    //     });
    // }

    // res.status(200).json({
    //     status: "success",
    //     req: req.requestTime,
    //     user,
    // });
};

exports.register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(200).json({
            status: "Success",
            message: "Successfully added a user to database",
            user: newUser,
        });
    } catch (err) {
        console.log(err);
        res.status(401).json ({
            status: "fail",
            message: `${err.message} ${err.name}`,
        });
    }
    // console.log(req.body);
    // const newUser = req.body;

    // // var user =users.find((el) => el._id == newUser._id);
    // var user = users.find((el) => el.email == newUser.email);

    // if (user) {
    //     return res.status(400).json({
    //         status: "fail",
    //         message: "User already exist",
    //     });
    // }

    // users.push(newUser);

    // fs.writeFile(
    //     `${__dirname}/../data/users.json`,
    //     JSON.stringify(users),
    //     (err) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 status: "fail",
    //                 message: "Something went wrong when adding data to database",
    //             });
    //         }

    //         return res.status(200).json({
    //             status: "success",
    //             message: "Successfully added a user to database",
    //             user: newUser,
    //         });
    //     }
    // );
};

exports.updateOneUser = async (req, res) => {
    try {
        const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json({
            status: "success",
            message: "User has been updated successfully.",
            user: newUser,
        });
    } catch(err) {
        res.status(401).json({
            status: "fail",
            message: "Something went wrong",
            error: err,
        });
    }
    // console.log(req.body);
    // const id = req.params.id;

    // var user = users.find((el) => el._id == id);

    // let index = users.indexOf(user);

    // Object.assign(user, req.body);

    // users[index] = user;

    // fs.writeFile(
    //     `${__dirname}/../data/users.json`,
    //     JSON.stringify(users),
    //     (err) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 status: "fail",
    //                 message: "Something went wrong when adding data to database",
    //             });
    //         }

    //         return res.status(200).json({
    //             status: "success",
    //             message: "Successfully added a user to database",
    //             // tour: newTour,
    //         });
    //     }
    // );

    // res.status(200).json({
    //     status: "scuuess",
    //     message: "User has been updated successfully.",
    // });
};

exports.deleteOneUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            message: "User has been deleted successfully."
        });
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: "Error whild deleting user",
        });
    }
    // console.log(req.body);
    // const id = req.params.id;
    // console.log(id);

    // var user = users.find((el) => el._id == id);

    // const index = users.indexOf(user);

    // users.splice(index, 1);

    // fs.writeFile(
    //     `${__dirname}/../data/users.json`,
    //     JSON.stringify(users),
    //     (err) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 status: "fail",
    //                 message: "Something went wrong when delete data to database",
    //             });
    //         }

    //         return res.status(200).json({
    //             status: "success",
    //             message: "User has been deleted successfully.",
    //             // tour: newTour,
    //         });
    //     }
    // );

    // if (!user) {
    //     return res.status(200).json({
    //         status: "fail",
    //         message: "User doesn't exist",
    //     });
    // }

    // res.status(200).json({
    //     status: "scuuess",
    //     message: "User has been deleted successfully.",
    // });
};

exports.deleteAllUser = async (req, res) => {
    try {
        await User.deleteMany();
        res.status(204).json({
          status: "Success",
          message: "User has been deleted successfully.",
        });
      } catch (err) {
        res.status(400).json({
          status: 'fail',
          message: "Error whild deleting ",
        });
      }
    // user = [];

    // res.status(200).json({
    //     status: "scuuess",
    //     message: "User deleted successfully.",
    // });
};

exports.checkBody = (req, res, next) => {
    console.log(req.body);
    console.log(">>>> this is checkbody middleware");
    if (!req.body.email || !req.body.name) {
        return res.status(400).json({
            status: "fail",
            message: "Missing email or name",
        });
    }
    next();
}