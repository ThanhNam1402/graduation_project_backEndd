import db from "./../../models/index";
const { Op } = require("sequelize");

let Remove = (req, res, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const DeleteData = await db.Order_Detail.destroy({
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

let Create = (req, res, dataAdd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const PostData = await db.Order_Detail.create({
        order_id: dataAdd.order_id,
        product_id: dataAdd.product_id,
        qty: dataAdd.qty,
        total: dataAdd.total,
        price: dataAdd.price,
        sale_price: dataAdd.sale_price,
        type: dataAdd.type,
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



module.exports = {
  Create: Create,
  Remove: Remove,
};
