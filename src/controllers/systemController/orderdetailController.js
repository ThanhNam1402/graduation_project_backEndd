import orderdetellService from "./../../services/systemService/orderdetailService";

let Create = async (req, res) => {
  const dataAdd = req.body;
  const data = await orderdetellService.Create(req, res, dataAdd);
  return data;
};

let Remove = async (req, res) => {
  const id = req.params.id;
  const data = await orderdetellService.Remove(req, res, id);
  return data;
};

module.exports = {
  Create: Create,
  Remove: Remove,
};
