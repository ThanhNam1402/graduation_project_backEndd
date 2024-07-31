import invertorycountService from "./../../services/systemService/invertorycountService"

let getAll = async (req, res) => {
  const data = await invertorycountService.getAll(req, res);
  return data;
};

let Remove = async (req, res) => {
    const id = req.params.id;
    const data = await invertorycountService.Remove(req, res, id);
    return data;
  };

let Update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const update = await invertorycountService.Update(req, res, id, data);
  return update;
}

module.exports = {
  getAll: getAll,
  Remove: Remove,
  Update: Update,
};