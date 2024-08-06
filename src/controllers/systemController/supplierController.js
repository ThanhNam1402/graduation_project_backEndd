
import supplierService from "../../services/systemService/supplierService";

// =============================================================================


let getAll = async (req, res) => {

  try {
    let reqQuery = req.query

    let data = await supplierService.handleGetAllSuppliers(reqQuery)
    return res.status(200).json({
      ...data

    })

  } catch (error) {
    console.log(error);
  }
}


let getCompleteSupplier = async (req, res) => {

  try {
    let keyWord = req.query.keyword

    let data = await supplierService.handleGetAllComplete(keyWord)
    return res.status(200).json({
      ...data
    })
  } catch (error) {
    console.log(error);
  }



}

module.exports = {
  getAll,
  getCompleteSupplier
};
