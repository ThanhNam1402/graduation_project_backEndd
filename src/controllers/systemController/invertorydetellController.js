import invertorydetellService from "./../../services/systemService/inventorydetellService";

let Create = async (req, res) => {
  const dataAdd = req.body;
  const data = await invertorydetellService.Create(req, res, dataAdd);
  return data;
};

let Remove = async (req, res) => {
  const id = req.params.id;
  const data = await invertorydetellService.Remove(req, res, id);
  return data;
};

module.exports = {
  Create: Create,
  Remove: Remove,
};
