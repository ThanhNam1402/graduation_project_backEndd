import db from "../../models/index";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

// =================================================================

let handleGetAllProducts = async (reqData) => {
  try {

    console.log(reqData);

    let condCate = ""
    if (Number(reqData.categoryID) !== 0) {
      condCate = {
        category_id: Number(reqData?.categoryID),
      }
    }

    const keyWord = reqData.keyWord || "";


    const res = {}
    const { count, rows } = await db.Product.findAndCountAll({

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



let handleAddProduct = async (reqBody, imgFile) => {
  return new Promise(async (resolve, reject) => {
    try {


      console.log("imgFile", imgFile);

      let checkCode = await db.Product.findOne({
        where: {
          code: reqBody.code
        }
      })

      if (checkCode) {
        resolve({
          message: "Đã Có Mã Sản Phẩm",
          success: false
        })
      }

      await db.Product.create({
        name: reqBody.name,
        code: reqBody.code,
        description: reqBody.description,
        barcode: reqBody.barcode,
        price: reqBody.price,
        sale_price: reqBody.sale_price,
        onHand: reqBody.onHand,
        img: imgFile,
        category_id: reqBody.categoryID,
      })
      resolve({
        success: true,
        message: 'Tạo Sản Phẩm Thành Công !!'
      });
    } catch (error) {
      reject(error);
    }
  })
}
let handleDelProduct = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Product.findOne({
        where: { id: id },
        raw: false
      })

      if (!user) {
        resolve({
          success: false,
          message: "Erro !! Không tìm thấy người dùng"
        })
      } else {
        await user.destroy();
        resolve({
          success: true,
          message: "Thao Tác Thành Công !"
        })
      }
    } catch (error) {
      reject(error)
    }


  })
}


let handleGetStockCard = async (id) => {
  try {

    console.log("id", id);

    let res = {}
    const getDetail = await db.Product.findAll({
      where: {
        id: id
      },
      raw: false,
      include: [
        {
          model: db.Invetory_Count,
        },
      ],
    })
    res.data = getDetail[0];
    res.success = true;
    res.message = 'success';

    console.log(res);

    return res



  } catch (error) {
    throw error;
  }

}

let handleUpdateProduct = async (reqBody, id) => {

  console.log(reqBody, id);
  // return new Promise(async (resolve, reject) => {
  //   try {

  //     let checkID = await db.Product.findOne({
  //       where: {
  //         id: id
  //       }
  //     })

  //     if (!checkID) {
  //       let checkCode = await db.Product.findOne({
  //         where: {
  //           code: reqBody.code
  //         }
  //       })

  //     } else {
  //       resolve({
  //         message: "Sản Phẩm Chưa Có",
  //         success: false,
  //       })
  //     }


  //     if (checkCode) {
  //       resolve({
  //         message: "Đã Có Mã Sản Phẩm",
  //         success: false
  //       })
  //     }

  //     await db.Product.create({
  //       name: reqBody.name,
  //       code: reqBody.code,
  //       description: reqBody.description,
  //       barcode: reqBody.barcode,
  //       price: reqBody.price,
  //       sale_price: reqBody.sale_price,
  //       category_id: reqBody.categoryID,
  //     })
  //     resolve({
  //       success: true,
  //       message: 'Tạo Sản Phẩm Thành Công !!'
  //     });
  //   } catch (error) {
  //     reject(error);
  //   }
  // })
}



module.exports = {
  handleGetAllProducts,
  handleAddProduct,
  handleDelProduct,
  handleUpdateProduct,
  handleGetStockCard
};
