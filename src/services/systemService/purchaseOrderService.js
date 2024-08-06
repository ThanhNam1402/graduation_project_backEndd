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

let handleGetAllComplete = async (keyWord) => {
    try {
        let res = {}
        const allProducts = await db.Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${keyWord}%`,
                },
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description', 'supplier_id']
            },
            raw: false,
            order: [
                ['id', 'DESC'],
            ]
        })
        res.data = allProducts;
        res.success = true;
        res.message = 'success';
        return res

    } catch (error) {
        throw error;
    }
}

let hadleAdd = (purChaseOrder, purChaseDetail) => {

    return new Promise(async (resolve, reject) => {
        try {
            let newPurChaseOrder = await db.PurchaseOrder.create({
                code: purChaseOrder?.code,
                note: purChaseOrder?.note,
                supplier_id: purChaseOrder.supplier_id,
                total_SalePrice: purChaseOrder.totalSalePrice,
                total: purChaseOrder.total,
                status: purChaseOrder.status
            })

            let newId = newPurChaseOrder.toJSON().id

            purChaseDetail?.data.forEach(async (item) => {
                let newPurChaseOrderDetail = await db.PurchaseOrder_Detail.create({
                    product_id: item?.id,
                    purchaseOrder_id: newId,
                    qty: item?.qty,
                    price: item?.price,
                    price_sale: item?.sale_price,

                })
            });

            updateProductQuantities(purChaseDetail?.data)

            resolve({
                success: true,
                message: 'Thêm Thành Thành Công !!'
            });
        } catch (error) {
            reject(error);
        }
    })
}

async function updateProductQuantities(products) {
    try {
        for (const product of products) {

            let pd = await db.Product.findOne({
                where: {
                    id: product.id,
                }
            })

            const updatedProduct = await db.Product.update(
                { onHand: Number(pd.onHand) + Number(product.qty) },
                { where: { id: product.id } }
            );

            if (!updatedProduct[0]) {
                console.log(`Sản phẩm có ID ${product.id} không tồn tại`);
            }
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
    }
}

module.exports = {
    handleGetAll,
    handleGetPurchaseDetail,
    handleGetAllComplete,
    hadleAdd
};
