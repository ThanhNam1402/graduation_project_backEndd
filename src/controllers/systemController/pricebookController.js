import priceService from "./../../services/systemService/PriceBookService"

let getAll = async (req, res) => {
  const data = await priceService.getAll(req, res);
  return data;
};

let Update  = async (req, res) => {
  const data = await priceService.Update (req, res);
  return data;
}

module.exports = {
  getAll: getAll,
  Update: Update,
};
