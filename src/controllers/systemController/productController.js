import productService from "../../services/systemService/productService";

// =============================================================================


let getAll = async (req, res) => {

  try {
    let reqQuery = req.query
    let data = await productService.handleGetAllProducts(reqQuery)

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

    console.log("reqBody", reqBody);
    let data = await productService.handleAddProduct(reqBody)
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
    let id = req.params?.id

    console.log("reqBody", reqBody);
    let data = await productService.handleUpdateProduct(reqBody, id)
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


module.exports = {
  getAll,
  newProduct,
  delProduct,
  updateProduct
};
