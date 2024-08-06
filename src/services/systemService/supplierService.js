import db from "../../models/index";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

// =================================================================

let handleGetAllSuppliers = async (reqData) => {
  try {

    console.log(reqData);
    let condCate = ""
    if (Number(reqData.status) !== 0) {
      condCate = {
        status: Number(reqData?.status),
      }
    }

    const keyWord = reqData.keyWord || "";
    const res = {}
    const { count, rows } = await db.Supplier.findAndCountAll({

      where: {
        ...condCate,
        code: {
          [Op.like]: `%${keyWord}%`,
        },
      },
      limit: Number(reqData.rowsPerPage),
      offset: (Number(reqData.page)) * Number(reqData.rowsPerPage),
      raw: true,
      order: [['id', 'DESC']],
    });

    console.log(rows);

    const pagination = {
      last_page: Math.ceil(count / Number(reqData.rowsPerPage)),
      page: Number(reqData.page),
      total: count
    }

    res.pagination = pagination
    res.data = rows;
    res.success = true;
    res.message = 'success';

    return res


  } catch (error) {
    throw error;
  }
}

let handleGetAllComplete = async (keyWord) => {
  try {
    let res = {}
    const allProducts = await db.Supplier.findAll({
      where: {
        name: {
          [Op.like]: `%${keyWord}%`,
        },
      },

      attributes: ['id', 'name'],
      raw: false,
      order: [
        ['id', 'DESC'],
      ]
    })
    res.data = allProducts;
    res.success = true;
    res.message = 'success';
    return res

  } catch (error) {
    throw error;
  }
}

module.exports = {
  handleGetAllSuppliers,
  handleGetAllComplete
};
