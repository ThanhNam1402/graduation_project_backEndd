import db from "./../../models/index";
const { Op } = require("sequelize");

let getAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    // Lấy tổng số bản ghi
    const totalItems = await db.Price_Book.count();
    // Lấy dữ liệu với giới hạn và offset
    const data = await db.Price_Book.findAll({
      limit: limit,
      offset: offset,
    //   include: [
    //     {
    //       model: db.Product,
    //       attributes: ["name", "price", "code"],
    //     },
    //   ],
    //   raw: true,
    //   nest: true,
    });

    if (data && data.length > 0) {
      const totalPages = Math.ceil(totalItems / limit);
      const currentPage = page;
      const pagination = {
        totalPages: totalPages,
        currentPage: currentPage,
      };

      res.status(200).json({
        messges: "Get All successfully!",
        success: true,
        data: data,
        start: currentPage,
        limit: limit,
        pagination: pagination,
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
      messges: err.messges, // Trả về thông báo lỗi cụ thể từ đối tượng lỗi
      success: false,
      data: [],
      start: "",
      limit: "",
      pagination: null,
    });
  }
};



let Update = (req, res, id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let updateData = {
       price: price
      };

      const fileone = await db.Product.findOne({
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
        const Update = await db.Product.update(updateData, {
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
            messges: "Missing ID and Update Fell!",
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

module.exports = {
  getAll: getAll,
  Update: Update,
};