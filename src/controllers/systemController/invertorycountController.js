import invertorycountService from "./../../services/systemService/invertorycountService"

let getAll = async (req, res) => {
  const data = await invertorycountService.getAll(req, res);
  return data;
};

let GetCode = async (req, res) => {
  const data = await invertorycountService.GetCode(req, res);
  return data;
}

let Create = async (req, res) => {
  const dataAdd = req.body;
  const data = await invertorycountService.Create(req, res, dataAdd);
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
  GetCode: GetCode,
  Create: Create,
  Remove: Remove,
  Update: Update,
};