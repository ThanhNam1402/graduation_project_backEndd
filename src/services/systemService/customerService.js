import db from "../../models/index";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

// =================================================================

let handleGetAllCustomers = async (reqData) => {
    try {

        console.log(reqData);
        let condCate = ""
        if (Number(reqData.status) !== 0) {
            condCate = {
                status: Number(reqData?.status),
            }
        }
        let condCsType = "" 
        if (Number(reqData.customer_type) !== 0) {
            condCsType = {
                customer_type: Number(reqData?.customer_type),
            }
        }

        const keyWord = reqData.keyWord || "";
        const res = {}
        const { count, rows } = await db.Customer.findAndCountAll({
            where: {
                ...condCate,
                ...condCsType,
                name: {
                    [Op.like]: `%${keyWord}%`,
                },
            },
            limit: Number(reqData.rowsPerPage),
            offset: (Number(reqData.page)) * Number(reqData.rowsPerPage),
            raw: true,
            order: [['id', 'DESC']],
        });

        console.log(rows);

        const pagination = {
            last_page: Math.ceil(count / Number(reqData.rowsPerPage)),
            page: Number(reqData.page),
            total: count
        }

        res.pagination = pagination
        res.data = rows;
        res.success = true;
        res.message = 'success';

        return res


    } catch (error) {
        throw error;
    }
}

module.exports = {
    handleGetAllCustomers,
};
