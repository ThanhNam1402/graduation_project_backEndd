import priceService from "./../../services/systemService/PriceBookService"

let getAll = async (req, res) => {
  const data = await priceService.getAll(req, res);
  return data;
};


let Update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const update = await priceService.Update(req, res, id, data);
  return update;
}

module.exports = {
  getAll: getAll,
  Update: Update,
};
