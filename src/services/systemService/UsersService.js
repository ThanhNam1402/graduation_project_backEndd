import db from "./../../models/index";

import { createTokenJWT } from "../../middelware/jwt"

const GetAll = async (req, res) => {
  try {
    const { email, name } = req.query;

    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      const newUser = await db.User.create({
        email: email,
        name: name,
        role: 1,
      });
      return res.status(201).json({
        messages: "User created successfully!",
        success: true,
        data: newUser,
      });
    } else {
      if (user.role === 1) {
        const users = await db.User.findAll();

        return res.status(200).json({
          messages: "Get all users successfully!",
          success: true,
          data: users,
        });
      } else {
        return res.status(403).json({
          error: 1,
          messages: "Not enough permissions",
          success: false,
          data: [],
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: 1,
      messages: err.message,
      success: false,
      data: [],
    });
  }
};


let GetOne = async (req, res, email) => {
  try {
    const data = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (data) {
      res.status(200).json({
        messges: "Get User successfully!",
        success: true,
        data: data,
      });
    } else {
      res.status(404).json({
        error: 1,
        messges: "No data",
        success: false,
        data: [],
        start: "",
        limit: "",
        pagination: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 1,
      messges: err,
      success: false,
      data: [],
      start: "",
      limit: "",
      pagination: null,
    });
  }
};

let Create = (req, res, dataAdd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkEmail = await db.User.findOne({
        where: { email: dataAdd.email },
      });

      if (checkEmail) {
        res.status(400).json({
          error: 1,
          messges: "Email must be unique and should not overlap!",
          success: false,
          data: [],
        });
        resolve("");
        return;
      }

      const PostData = await db.User.create({
        name: dataAdd.name,
        phone_number: dataAdd.phone_number,
        email: dataAdd.email,
        address: dataAdd.address,
      });

      if (PostData) {
        res.status(201).json({
          error: 0,
          messges: "Add successfully!",
          success: true,
          data: PostData,
        });
      } else {
        res.status(404).json({
          error: 1,
          messges: "Create Failed!",
          success: false,
          data: [],
        });
      }
      resolve("");
    } catch (err) {
      reject(err);
    }
  });
};

let Remove = (req, res, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const DeleteData = await db.User.destroy({
        where: {
          id: id,
        },
      });

      if (DeleteData) {
        res.status(200).json({
          error: 0,
          messges: "Delete successfully!",
        });
      } else if (DeleteData == 0) {
        res.status(404).json({
          error: 1,
          messges: "Missing ID and Delete Fell!",
          data: [],
        });
      } else {
        res.status(500).json({
          error: 1,
          messges: "Sever Error!",
          data: [],
        });
      }
      resolve("");
    } catch (err) {
      reject(err);
    }
  });
};

let Update = (req, res, id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let updateData = {
        name: data.name,
        phone_number: data.phone_number,
        email: data.email,
        address: data.address,
      };

      const fileone = await db.User.findOne({
        where: {
          id: id,
        },
      });
      if (!fileone) {
        res.status(404).json({
          error: 1,
          messges: "The target to be updated was not found!",
          success: false,
          data: [],
        });
      } else {
        const Update = await db.User.update(updateData, {
          where: {
            id: id,
          },
        });
        if (Update) {
          res.status(202).json({
            error: 0,
            messges: "Update successfully!",
            success: true,
            data: updateData,
          });
        } else if (!Update) {
          res.status(404).json({
            error: 1,
            messges: "Missing ID and Delete Fell!",
            success: false,
            data: [],
          });
        }
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

let handleGetUserInfo = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {

      let res = {}
      const data = await db.User.findOne({
        where: {
          email: email,
        },
        attributes: ['id', 'name', 'email', 'role'],

      });


      if (data) {
        res.data = data
        res.success = true
        res.message = 'success';
        res.token = createTokenJWT(data)
      } else {

        let newUser = await db.User.create({
          email: email,
          name: email,
          role: 1,
          password: Date.now()
        })

        let data = {
          name: newUser.toJSON().name,
          email: newUser.toJSON().email,
          id: newUser.toJSON().id,
          role: newUser.toJSON().role
        }
        res.success = true
        res.message = 'success';
        res.data = data
        res.token = createTokenJWT(data)

      }

      resolve(res)


    } catch (error) {
      reject(error)
    }
  }
  )

}

module.exports = {
  GetAll: GetAll,
  GetOne: GetOne,
  Create: Create,
  Remove: Remove,
  Update: Update,
  handleGetUserInfo
};
