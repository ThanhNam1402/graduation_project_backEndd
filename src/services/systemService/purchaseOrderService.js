import db from "../../models/index";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

// =================================================================

let handleGetAll = async (reqData) => {
    try {

        console.log(reqData);
        let condCate = ""
        if (Number(reqData.status) !== 0) {
            condCate = {
                status: Number(reqData?.status),
            }
        }
        let condCsType = ""
        if (Number(reqData.customer_type) && Number(reqData.customer_type) !== 0) {
            condCsType = {
                customer_type: Number(reqData?.customer_type),
            }
        }

        const keyWord = reqData.keyWord || "";
        const res = {}
        const { count, rows } = await db.PurchaseOrder.findAndCountAll({
            where: {
                ...condCate,
                ...condCsType,
                code: {
                    [Op.like]: `%${keyWord}%`,
                },
            },
            include: [
                {
                    model: db.Supplier,
                    attributes: ["id", "code", "name"],
                },
            ],
            limit: Number(reqData.rowsPerPage),
            offset: (Number(reqData.page)) * Number(reqData.rowsPerPage),
            raw: false,
            order: [['id', 'DESC']],
        });

        // console.log(rows);


        console.log(rows);


        // const join2 = await db.PurchaseOrder.findAll({
        //     where: {
        //         id: 1
        //     },

        //     raw: false,

        //     include: [
        //         {
        //             model: db.Product,
        //             attributes: ["id", "code", "name"],

        //         },
        //     ],
        //     order: [

        //         [db.Product, 'id', 'DESC'],

        //     ]

        // })

        // console.log("join2", join2);


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

let handleGetPurchaseDetail = async (id) => {
    try {
        let res = {}
        const getDetail = await db.PurchaseOrder.findAll({
            where: {
                id: id
            },
            attributes: ["id"],
            raw: false,
            include: [
                {
                    model: db.Product,
                    attributes: ["id", "code", "name"],
                },
            ],
            order: [
                [db.Product, 'id', 'DESC'],
            ]
        })
        res.data = getDetail[0];
        res.success = true;
        res.message = 'success';
        return res

    } catch (error) {
        throw error;
    }

}

module.exports = {
    handleGetAll,
    handleGetPurchaseDetail
};
