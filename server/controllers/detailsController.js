
var ObjectId = require('mongodb').ObjectId;
const MetaInfo = require("../models/MetaInfo");
const ExperimentInfo = require("../models/Experiments");
const User = require("../models/Users");
const url = require('url');



// post to get details
const getDepartmentandmemberdetails =  async function (req, res, next) {
   
    let university =req.body.university
    let college =req.body.collegeName
    try{
        const metas = await MetaInfo.aggregate( [
            {$match:{ college:college}}, 
            {$group: { _id: "$department" }}
        ] );

let department = metas.map((obj) => obj._id);

res.json({"list":department})
// for(let i = 0; i < department.length; i++) {
//     console.log(department[i]);

// }
    

    }
    catch (err) {
        console.error(err);
      }
    
};


// post to get lab details
const getlabdetail =  async function (req, res, next) {
   
    let university =req.body.university
    let college =req.body.collegeName
    let department =req.body.department
    try{
        const admin    = await User.find({ $and: [{ university:university},{ collegeName:college},{department:department},{role:"admin"} ] })
        const teachers = await User.find({ $and: [{ university:university},{ collegeName:college},{department:department},{role:"teacher"} ] })
        const students = await User.find({ $and: [{ university:university},{ collegeName:college},{department:department},{role:"student"} ] })
        const metas = await MetaInfo.aggregate( [
            {$match:{ department:department}}, 
            {$group: { _id: "$labtype" }}
          
        ] );
        const ids = metas.map((obj) => obj._id);
        console.log(students)
        const totalrunz = await ExperimentInfo.find({  $and: [{ collegeName:college},{department:department},{labType: { $in: ids }}]})
            // field: { $in: ids } })

        console.log(totalrunz.length)

        res.json({
            "admin":admin.length,
            "teachers":teachers.length,
            "students":students.length,
            "listofrunz":totalrunz.length,
            "list":ids,
            "department":department
        })

    }
    catch (err) {
        console.error(err);
      }
    
};


const getlabdetailadmin= async function(req,res){
    let university =req.body.university
    let college =req.body.collegeName
    let lab =req.body.lab
    try{
        const teachers = await User.find({ $and: [{ university:university},{ collegeName:college},{ labtype: { $in: [lab ] } },{role:"teacher"} ] })
        const students = await User.find({ $and: [{ university:university},{ collegeName:college},{labtype: { $in: [lab ] }},{role:"student"} ] })

        const metas = await MetaInfo.find({ $and: [ { labtype:lab }, {college:college}] } )
    const ids = metas.map((obj) => obj.ProcedureName);
      
        const totalrunz = await ExperimentInfo.find({  $and: [{ collegeName:college},{labType: lab}]})
            // field: { $in: ids } })

        console.log(totalrunz.length)

        res.json({

            "teachers":teachers.length,
            "students":students.length,
            "listofrunz":totalrunz.length,
            "list":ids,
           
        })
    }
    catch (err) {
        console.error(err);
      }
}



module.exports = { getDepartmentandmemberdetails,getlabdetail,getlabdetailadmin};








