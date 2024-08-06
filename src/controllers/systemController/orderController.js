import OrderService from "./../../services/systemService/OrderService";

let GetAll = async (req, res) => {
  const data = await OrderService.GetAll(req, res);
  return data;
};


let GetCode = async (req, res) => {
  const data = await OrderService.GetCode(req, res);
  return data;
}

let Create = async (req, res) => {
  const dataAdd = req.body;
  const data = await OrderService.Create(req, res, dataAdd);
  return data;
};

let Remove = async (req, res) => {
  const id = req.params.id;
  const data = await OrderService.Remove(req, res, id);
  return data;
};

let UpdateStatus  = async (req, res) => {
  const data = await OrderService.UpdateStatus (req, res);
  return data;
}

module.exports = {
  GetAll: GetAll,
  GetCode: GetCode,
  Create: Create,
  Remove: Remove,
  UpdateStatus: UpdateStatus
};
