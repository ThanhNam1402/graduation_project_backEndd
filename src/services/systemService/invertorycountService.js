import db from "./../../models/index";

let getAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    // Fillter
    const statusFilter = req.query.status;
    const idFilter = req.query.id;

    let filter = {};
    if (statusFilter) {
      filter.status = statusFilter;
    }
    if (idFilter) {
      filter.id = idFilter;
    }

    const totalItems = await db.Inventory_Count.count({
      where: filter,
    });

    // Lấy dữ liệu với giới hạn và offset
    const data = await db.Inventory_Count.findAll({
      where: filter,
      limit: limit,
      offset: offset,
      include: [
        {
          model: db.Product,
          // attributes: ['price', 'sale_price']
        },
      ],
      raw: true,
      nest: true,
    });

    console.log(data);

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
      messges: err.message, // Trả về thông báo lỗi cụ thể từ đối tượng lỗi
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
    const latestInventory = await db.Inventory_Count.findOne({
      order: [["id", "DESC"]],
    });

    if (latestInventory) {
      res.status(200).json({
        error: 0,
        messages: "Get code successfully!",
        success: true,
        data: { 
          id: latestInventory.id, 
          code: latestInventory.code 
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
      const PostData = await db.Inventory_Count.create({
        code: dataAdd.code,
        status: dataAdd.status,
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
      const DeleteData = await db.Inventory_Count.destroy({
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
        price: price,
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
  GetCode: GetCode,
  Create: Create,
  Remove: Remove,
  Update: Update,
};
