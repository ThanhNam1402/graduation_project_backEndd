import db from "./../../models/index";
const { Op } = require("sequelize");

let GetAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const statusFilter = req.query.status;
    const idFilter = req.query.id;

    let filter = {};
    if (statusFilter) {
      filter.status = statusFilter;
      filter.id = idFilter;
    }

    const totalItems = await db.Order.count({
      where: filter,
    });

    // Lấy dữ liệu với giới hạn và offset
    const data = await db.Order.findAll({
      where: filter,
      limit: limit,
      offset: offset,
      include: [
        {
          model: db.Product,
        },
      ],
      raw: true,
      nest: true,
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

const GetCode = async (req, res) => {
  try {
    // Lấy mã code cuối cùng từ cơ sở dữ liệu
    const lastCode = await db.Order.findOne({
      order: [["id", "DESC"]],
    });

    if (lastCode) {
      res.status(200).json({
        error: 0,
        messages: "Get code successfully!",
        success: true,
        data: {
          id: lastCode.id,
          code: lastCode.code,
        },
      });
    } else {
      res.status(404).json({
        error: 1,
        messages: "Not found",
        success: false,
        data: { code: null },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let Create = (req, res, dataAdd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const PostData = await db.Order.create({
        client_name: dataAdd.client_name,
        client_paid: dataAdd.client_paid,
        code: dataAdd.code,
        status: dataAdd.status,
        note: dataAdd.note,
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
      const DeleteData = await db.Order.destroy({
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

let UpdateStatus = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id } = req.params;
      const status = req.body.status;

      console.log(id);
      

      const updated = await db.Order.update(
        { status: status },
        { where: { id: id } }
      );

      if (updated) {
        const updatedOrder = await db.Order.findByPk(id);

        if (updatedOrder) {
          res.status(200).json({
            error: 0,
            messges: "Update successfully!",
            success: true,
            data: updatedOrder,
          });
        } else {
          res.status(404).json({
            error: 1,
            messges: "Order not found!",
            success: false,
            data: [],
          });
        }
      } else {
        res.status(404).json({
          error: 1,
          messges: "Update failed!",
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
  GetAll: GetAll,
  GetCode: GetCode,
  Create: Create,
  Remove: Remove,
  UpdateStatus: UpdateStatus,
};
