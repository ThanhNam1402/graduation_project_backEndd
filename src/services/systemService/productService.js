import db from "../../models/index";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const fs = require('node:fs');
const { convertArrayToCSV } = require('convert-array-to-csv')

// =================================================================

let handleGetAllCate = async (reqData) => {
  try {
    const res = {}
    const { count, rows } = await db.Category.findAndCountAll({
      attributes: ['id', 'name'],
      raw: false,
      order: [['id', 'DESC']],

    });

    res.data = rows;
    res.success = true;
    res.message = 'success';

    return res


  } catch (error) {
    throw error;
  }
}
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
    let condStatus = ""
    if (Number(reqData.displayOption) !== 0) {
      condStatus = {
        status: Number(reqData?.displayOption),
      }
    }
    let condOnHand = ""
    if (Number(reqData.onHand) !== 0) {
      if (Number(reqData.onHand) === 1) {
        condOnHand = {
          onHand: {
            [Op.gt]: 0
          }
        }
      } else if (Number(reqData.onHand) === 2) {
        condOnHand = {
          onHand: {
            [Op.lte]: 0

          }
        }

      }

    }

    const keyWord = reqData.keyWord || "";


    const res = {}
    const { count, rows } = await db.Product.findAndCountAll({

      where: {
        ...condCate,
        ...condStatus,
        ...condOnHand,
        code: {
          [Op.like]: `%${keyWord}%`,
        },
      },
      limit: Number(reqData.rowsPerPage),
      offset: (Number(reqData.page)) * Number(reqData.rowsPerPage),
      raw: false,
      order: [['id', 'DESC']],
      include: [
        {
          model: db.Category,
          attributes: ['id', 'name']
        },
      ],
    });
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

let handleGetOneProducts = async (id) => {
  try {

    let res = {}
    const data = await db.Product.findOne({
      where: {
        id: id
      },
      raw: false,
    });

    res.data = data;
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

      if (reqBody.code) {
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
      }

      await db.Product.create({
        name: reqBody.name,
        code: reqBody?.code ? reqBody?.code : Date.now(),
        description: reqBody?.description,
        barcode: reqBody?.barcode,
        price: reqBody.price,
        sale_price: reqBody?.sale_price,
        onHand: reqBody?.onHand,
        img: imgFile,
        category_id: reqBody?.category_id,
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

let handleUpdateProduct = async (reqBody, imgFile, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("imgFile", imgFile);

      let data = await db.Product.findOne({
        where: {
          id: id
        },
        raw: false

      })

      if (!data) {
        resolve({
          message: "Không có sản phẩm",
          success: false
        })
      } else {
        data.code = reqBody?.code ? reqBody.code : data.code,
          data.name = reqBody.name,
          data.description = reqBody?.description,
          data.barcode = reqBody?.barcode,
          data.price = reqBody.price,
          data.sale_price = reqBody?.sale_price,
          data.onHand = reqBody?.onHand,
          data.img = imgFile ? imgFile : data.img,
          data.category_id = reqBody?.category_id,
          data.status = reqBody?.status ?? 1

        await data.save();

        resolve({
          success: true,
          message: "Cập Nhật Thành Công !"
        });
      }


    } catch (error) {
      reject(error);
    }
  })
}

let handleDelProduct = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findOne({
        where: { id: id },
        raw: false
      })


      console.log("data", data);

      if (!data) {
        resolve({
          success: false,
          message: "Erro !! Không tìm thấy người dùng"
        })
      } else {
        data.status = 2
        await data.save();
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

let handledownloadFile = async (name) => {
  const header = ['#', 'name', 'giá', 'giá giảm', 'mô tả', 'mã', 'mã số thuế', 'tồn kho', 'hình ảnh', 'nhóm hàng'];

  const { count, rows } = await db.Product.findAndCountAll({
    where: {
      status: 1
    },
    raw: false,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Category,
        attributes: ['id', 'name']
      },
    ],
  });

  const newDataArrays = rows.map((item, index) => [
    index + 1,
    item?.name,
    item?.price,
    item?.sale_price,
    item?.description,
    item?.code,
    item?.barcode,
    item?.onHand,
    item?.img,
    item?.Category?.name
  ]);

  const csvFromArrayOfObjects = convertArrayToCSV(newDataArrays, {
    header,
    separator: ','
  });

  let newDate = new Date();
  var datetime = "_" + newDate.getDate() + "_" + (newDate.getMonth() + 1) + "_" + newDate.getFullYear() + '_' + newDate.getHours()
    + newDate.getMinutes()
    + newDate.getSeconds();

  let nameFile = name + datetime + '.csv'

  fs.writeFile('src/upload_files/' + nameFile, csvFromArrayOfObjects, err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });

  return nameFile;
}





module.exports = {
  handleGetAllProducts,
  handleGetOneProducts,
  handleAddProduct,
  handleDelProduct,
  handleUpdateProduct,
  handleGetStockCard,
  handleGetAllCate,
  handledownloadFile
};
