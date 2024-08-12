import db from "../../models/index";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

// =================================================================

let handleGetAll = async (reqData) => {
    try {
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

let handleGetOne = async (id) => {
    try {

        let res = {}
        const data = await db.PurchaseOrder.findOne({
            where: {
                id: id
            },
            raw: false,
            include: [
                {
                    model: db.Supplier,
                    attributes: ["id", "code", "name"],
                },
            ],

        });

        res.data = data;
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
                status: 1
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
                code: purChaseOrder?.code ? purChaseOrder?.code : 'PNH' + Date.now(),
                note: purChaseOrder?.note,
                supplier_id: purChaseOrder.supplier_id,
                user_id: purChaseOrder?.user_id,
                total_SalePrice: purChaseOrder.totalSalePrice,
                total: purChaseOrder.total,
                status: purChaseOrder.status
            })

            let newId = newPurChaseOrder.toJSON().id

            purChaseDetail?.data.forEach(async (item) => {
                await db.PurchaseOrder_Detail.create({
                    product_id: item?.id,
                    purchaseOrder_id: newId,
                    qty: item?.qty,
                    price: item?.price,
                    sale_price: item?.sale_price,

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


let handleUpdate = (purChaseOrder, purChaseDetail) => {

    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.PurchaseOrder.findOne({
                where: {
                    id: 60
                }
            })
            console.log(data);

            data.code = purChaseOrder?.code ? purChaseOrder?.code : 'PNH' + Date.now()
            data.note = purChaseOrder?.note
            data.supplier_id = purChaseOrder.supplier_id
            data.total_SalePrice = purChaseOrder.totalSalePrice
            data.total = purChaseOrder.total
            data.status = purChaseOrder.status

            await data.save()


            purChaseDetail?.data.forEach(async (item) => {
                let newPurChaseOrderDetail = await db.PurchaseOrder_Detail.create({
                    product_id: item?.id,
                    purchaseOrder_id: newId,
                    qty: item?.qty,
                    price: item?.price,
                    sale_price: item?.sale_price,

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
    hadleAdd,
    handleGetOne,
    handleUpdate
};
