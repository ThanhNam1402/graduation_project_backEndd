import productService from "../../services/systemService/productService";

// =============================================================================


let getAll = async (req, res) => {

  try {


    let reqQuery = req.query
    let data = await productService.handleGetAllProducts(reqQuery)

    return res.status(201).json({
      ...data

    })

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAll,
};
