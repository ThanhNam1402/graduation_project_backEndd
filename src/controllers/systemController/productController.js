import productService from "../../services/systemService/productService";

import { createTokenJWT } from "../../middelware/jwt"

// =============================================================================


let getAllCate = async (req, res) => {

  try {
    let data = await productService.handleGetAllCate()

    return res.status(200).json({
      ...data

    })

  } catch (error) {
    console.log(error);
  }
}

// =============================================================================


let getAll = async (req, res) => {

  try {
    let reqQuery = req.query
    let data = await productService.handleGetAllProducts(reqQuery)

    let user = {
      name: 'admin',
      role: 1,
      email: 'admin@example.com'
    }
    let token = createTokenJWT(user)
    return res.status(200).json({
      ...data,
    })

  } catch (error) {
    console.log(error);
  }
}

let getOne = async (req, res) => {

  try {
    let id = req.params.id
    let data = await productService.handleGetOneProducts(id)

    return res.status(200).json({
      ...data

    })

  } catch (error) {
    console.log(error);
  }
}

let getStockCard = async (req, res) => {

  try {
    let id = req.params.id
    let data = await productService.handleGetStockCard(id)

    return res.status(200).json({
      ...data

    })

  } catch (error) {
    console.log(error);
  }
}

let newProduct = async (req, res) => {
  try {

    let reqBody = req.body
    let imgFile = ''

    if (req.file) {
      imgFile = req.file.filename
    }

    console.log("reqBody", reqBody);
    console.log("reqBody", imgFile.filename);
    let data = await productService.handleAddProduct(reqBody, imgFile)
    return res.status(201).json({
      ...data
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error with server",
      success: false,
    })
  }
}

let updateProduct = async (req, res) => {
  try {

    let reqBody = req.body
    let id = req.params.id

    let imgFile = ''

    if (req.file) {
      imgFile = req.file.filename
    }

    let data = await productService.handleUpdateProduct(reqBody, imgFile, id)
    return res.status(201).json({
      ...data
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error with server",
      success: false,
    })
  }
}

let delProduct = async (req, res) => {

  try {
    let reqParams = req.params.id
    let data = await productService.handleDelProduct(reqParams)

    return res.status(201).json({
      ...data
    })

  } catch (error) {
    console.log(error);
  }
}

let downloadFile = async (req, res) => {
  let data = await productService.handledownloadFile(req.params.name)
  return res.status(200).json({
    data: data
  })
}

let downloadFileAll = async (req, res) => {
  let name = req.params.name;
  res.download('src/upload_files/' + name, name);
}


module.exports = {
  getAll,
  getOne,
  newProduct,
  delProduct,
  updateProduct,
  getStockCard,
  getAllCate,
  downloadFile,
  downloadFileAll
};
