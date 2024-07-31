import db from "./../../models/index";
const { Op } = require("sequelize");

let GetAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
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

let Create = (req, res, dataAdd) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalQty = 0;
      let totalPrice = 0;
      let products = await Promise.all(
        dataAdd.products.map(async (product) => {
          let productInfo = await db.Product.findByPk(product.product_id);
          if (productInfo) {
            totalQty += product.quantity;
            totalPrice += productInfo.price * product.quantity;
            return {
              product_id: product.product_id,
              quantity: product.quantity,
              name: productInfo.name,
              price: productInfo.price,
            };
          } else {
            throw new Error(`Product with id ${product.product_id} not found`);
          }
        })
      );

      // Tạo đơn hàng mới với thông tin từ dataAdd và các sản phẩm
      const PostData = await db.Order.create({
        client_name: dataAdd.client_name,
        products: products,
        qty: totalQty,
        total: totalPrice,
        client_paid: dataAdd.client_paid,
        status: dataAdd.status,
      });

      if (PostData) {
        res.status(201).json({
          error: 0,
          messages: "Add successfully!",
          success: true,
          data: PostData,
        });
      } else {
        res.status(404).json({
          error: 1,
          messages: "Create Failed!",
          success: false,
          data: [],
        });
      }
      resolve("");
    } catch (err) {
      res.status(500).json({
        error: 1,
        messages: err.message,
        success: false,
      });
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

module.exports = {
  GetAll: GetAll,
  Create: Create,
  Remove: Remove,
};