const { updateItemStatus } = require("../controllers/commonController")
const { models } = require("../models")

const router = require("express").Router()

router.put("/change-item-status", updateItemStatus )
router.get("/item-logs/:id",async(req,res)=>{
   try {
    const {id} = req.params
    if(!id){
        return res.send({message:"id required", status:404})
    }
    const logs = await models.StatusLogs.findAll({
        where:{
            item_id:id
        },
        include: [
            {
              model: models.Employee,
              as: "Employee"
            },
            {
              model:models.Supplier,
              as:"Supplier"
            }
          ],
    })
    res.send(logs)
   } catch (error) {
    console.error(error)
    res.send({message:"Internal Server error", status:500})
   }
})
module.exports = router