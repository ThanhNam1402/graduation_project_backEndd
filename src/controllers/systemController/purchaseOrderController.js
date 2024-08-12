
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
let getOne = async (req, res) => {
  try {
    let { id } = req.params
    let data = await purchaseOrderService.handleGetOne(id)
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

let getConpleteProduct = async (req, res) => {

  try {
    let keyWord = req.query.keyword

    let data = await purchaseOrderService.handleGetAllComplete(keyWord)
    return res.status(200).json({
      ...data
    })


  } catch (error) {
    console.log(error);
  }

}

let AddPurChaseOrder = async (req, res) => {
  console.log(req.body.dataDetail);
  console.log(req.body.dataPurChase);

  let data = await purchaseOrderService.hadleAdd(req.body.dataPurChase, req.body.dataDetail)
  res.status(200).json({
    ...data
  })

}
let updatePurChaseOrder = async (req, res) => {
  console.log(req.body.dataDetail);
  console.log(req.body.dataPurChase);

  let data = await purchaseOrderService.handleUpdate(req.body.dataPurChase, req.body.dataDetail)
  res.status(200).json({
    ...data
  })

}

module.exports = {
  getAll,
  handleGetDetail,
  getConpleteProduct,
  AddPurChaseOrder,
  getOne,
  updatePurChaseOrder
};
