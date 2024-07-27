import db from "../../models/index";

// =================================================================

let handleGetAllProducts = async (reqData) => {
  try {

    console.log(reqData);

    const res = {}
    const { count, rows } = await db.Product.findAndCountAll({

      where: {
        category_id: Number(reqData.categoryID)
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


module.exports = {
  handleGetAllProducts,
};
