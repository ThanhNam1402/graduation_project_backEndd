
import customerService from "../../services/systemService/customerService";

// =============================================================================


let getAll = async (req, res) => {

  try {
    let reqQuery = req.query

    let data = await customerService.handleGetAllCustomers(reqQuery)
    return res.status(200).json({
      ...data

    })

  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getAll,
};
