const {Category} = require('../../db/models')

module.exports = {
    getAllCategories : async (req,res,next)=>{
        try {
            const categories = await Category.findAll({
                where : {user: req.user.id}
            })

            return res.status(200).json({
                message: 'Success get All Categories',
                data: categories
            })
        } catch (error) {
            next(error)
        }
    },

    createCategories : async (req,res,next)=>{
        try {
            const {name} =req.body
            const categories = await Category.create({
                name,
                user:req.user.id
            })
            return res.status(200).json({
                message: 'Success Create categories',
                data: categories
            })
        } catch (error) {
            next(error)
        }
    },

    updateCategories : async(req,res,next)=>{
        try {
            const{id} = req.params
            const {name}= req.body
            const findCategories = await Category.findOne({
                where:{
                    id: id,
                    user: req.user.id
                }
            })
            if(!findCategories) return res.status(403).json({message:"Data Not Found"})
            const categories = await findCategories.update(
                {name:name}
            )
            //cari dulu idnya
            return res.status(200).json({
                message: "pencarian berhasil",
                data: findCategories
            })
        } catch (error) {
            next(error)
        }
    },
    deleteCategroies : async(req,res,next)=>{
        Category.findOne({
            where: {id: req.params.id, user: req.user.id}
        })
        .then((categories)=>{
            if (categories) {
                categories.destroy();
                res.status(200).json({
                    message: 'success',
                    data: categories
                })
            }else{
                res.status(500).json({
                    message: 'Not Found'
                })
            }
            
        }).catch((err)=>next(err))
    }
}