
var ObjectId = require('mongodb').ObjectId;
const MetaInfo = require("../models/MetaInfo");

const postInfo = function (req, res, next) {
  console.log(req.body)
  const newMetaInfo = new MetaInfo({
    id: req.body.experimentno,
    ProcedureName: req.body.experiment,
    labtype: req.body.labtype,
    department: req.body.department,
    year: req.body.year,
    semester: req.body.semester,
    college: req.body.college,
    university: req.body.university,
    category:"college"
  });
  newMetaInfo
    .save()
    .then((content) => res.json(content))
    .catch((err) => console.error(err));
};


const getSelectedExplist = async function (req, res, next) {
  let lab= req.body.lab
  let college= req.body.college
  console.log(lab)
  try {
    const metas = await MetaInfo.find({ $and: [ { labtype:lab }, {college:college}] } );
console.log(metas)
    res.json({ data: metas, totalCount: metas.length });
  } catch (err) {
    console.error(err);
  }
};




const patchById = async (req, res) => {
  try {
    console.log("moreifo",req.body)

    const modifiedMetaInfo = await MetaInfo.findByIdAndUpdate(
      // req.body.editid
      req.body._id,
      {$set: {
          ProcedureName: req.body.experiment,
          labtype: req.body.lab,
          department: req.body.department,
          year: req.body.year,
          college: req.body.college,
          semester: req.body.semester,
          university:req.body.university
        },
      },
      { new: true }
    );
   res.json(modifiedMetaInfo);
  } catch (err) {
    console.error(err);
  }
};

const getById = async function (req, res, next) {
  try {
    const meta = await MetaInfo.findOne({ id: req.params._id });
    res.json(meta);
  } catch (err) {
    console.error(err);
  }
};

const getInfo = async function (req, res, next) {
  try {
    const metas = await MetaInfo.find();

    res.json({ data: metas, totalCount: metas.length });
  } catch (err) {
    console.error(err);
  }
};

const getCollege = async function (req, res, next) {
  console.log("hello")
  try {
    const metas = await MetaInfo.aggregate( [
   
        {$group: { _id: "$college" }}
      
    ] );
    const ids = metas.map((obj) => obj._id);
    res.json({ ids});
    console.log( ids)
  } catch (err) {
    console.error(err);
  }
};

const getDepartment = async function (req, res, next) {
  collegeval = req.body.college
  console.log("hello")
  try {
    const metas = await MetaInfo.aggregate( [
        {$match:{ college:collegeval}}, 
        {$group: { _id: "$department" }}
      
    ] );
    const ids = metas.map((obj) => obj._id);
    res.json({ ids});
    console.log( ids)
  } catch (err) {
    console.error(err);
  }
};

const getLabs = async function (req, res, next) {
  let departmentval = req.body.department
  let collegeName=req.body.collegeName
  console.log("hai",departmentval)
  try {
    const metas = await MetaInfo.aggregate( [
        {
          $match: {
            $and: [ 
                {department: departmentval}, 
                {college:collegeName}, 
             
            ]
       }
          
          
          
          
          
          
        }, 
        {$group: { _id: "$labtype" }}
      
    ] );
    const ids = metas.map((obj) => obj._id);
    res.json({ ids});
    console.log( ids)
  } catch (err) {
    console.error(err);
  }
};

const getExplist = async function (req, res, next) {
  labval = req.body.lab
  college= req.body.college
  console.log("hai",labval,college)
  try {
    const metas = await MetaInfo.find({ $and: [ { labtype:labval }, {college:college}] } )
    const ids = metas.map((obj) => obj.ProcedureName);
    res.json({ ids});
    console.log( ids)
  } catch (err) {
    console.error(err);
  }
};

const getLabsfromdepartment = async function (req, res, next) {
  department = req.body.department
  college = req.body.college
  console.log(req.body)
  try {
    const metas = await MetaInfo.aggregate( [
        {$match: { $and: [ { $or : [
          {department : department },
          {department : "All"}]}, { college:college  } ] } },
        // {$match:{ department:department}}, 
        {$group: { _id: "$labtype" }}
      
    ] );
    const ids = metas.map((obj) => obj._id);
    res.json({ ids});
    console.log( ids)
  } catch (err) {
    console.error(err);
  }
};


const getUniversity= async(req,res)=>{


  try {
    const metas = await MetaInfo.aggregate( [
   
        {$group: { _id: "$university" }}
      
    ] );

    const idss = metas.map((obj) => obj._id);
    const ids =  idss.filter(e =>  e);

  
    res.json({ ids});
    console.log( ids)
  } catch (err) {
    console.error(err);
  }

};


const getRespectiveCollege= async(req,res)=>{
let university = req.body.university
console.log(university)

try {
  const metas = await MetaInfo.aggregate( [
    {$match:{ university:university}}, 
    {$group: { _id: "$college" }}
  
] );


  const ids = metas.map((obj) => obj._id);

  res.json({ ids});
  console.log( ids)
} catch (err) {
  console.error(err);
}

};


module.exports = { postInfo, patchById, getById, getInfo, getLabs, getDepartment, getCollege,getExplist,getLabsfromdepartment,getSelectedExplist ,getUniversity,getRespectiveCollege};








