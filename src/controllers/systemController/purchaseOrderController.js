
import purchaseOrderService from "../../services/systemService/purchaseOrderService";

// =============================================================================


let getAll = async (req, res) => {
  try {
    let reqQuery = req.query
    let data = await purchaseOrderService.handleGetAll(reqQuery)
    return res.status(200).json({
      ...data
    })
  } catch (error) {
    console.log(error);
  }
}

let handleGetDetail = async (req, res) => {

  try {
    let id = req.params.id
    console.log(id);
    let data = await purchaseOrderService.handleGetPurchaseDetail(id)
    return res.status(200).json({
      ...data
    })
  } catch (error) {
    console.log(error);

  }


}


module.exports = {
  getAll,
  handleGetDetail
};
