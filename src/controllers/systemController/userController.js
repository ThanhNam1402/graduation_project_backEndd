import UserService from "./../../services/systemService/UsersService";

let GetAll = async (req, res) => {
  const data = await UserService.GetAll(req, res);
  return data;
};

let GetOne = async (req, res) => {
  const email = req.query.email;
  console.log(req.query);
  const data = await UserService.GetOne(req, res, email);
  return data;
};

let Create = async (req, res) => {
  const dataAdd = req.body;
  const data = await UserService.Create(req, res, dataAdd);
  return data;
};

let Remove = async (req, res) => {
  const id = req.params.id;
  const data = await UserService.Remove(req, res, id);
  return data;
};

let Update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const update = await UserService.Update(req, res, id, data);
  return update;
};

// =====================================================

let GetUserInfo = async (req, res) => {
  console.log(req.query?.email);

  let data = await UserService.handleGetUserInfo(req?.query?.email)
  return res.status(200).json({
    ...data,
  })

}

module.exports = {
  GetAll: GetAll,
  GetOne: GetOne,
  Create: Create,
  Remove: Remove,
  Update: Update,
  GetUserInfo
};
