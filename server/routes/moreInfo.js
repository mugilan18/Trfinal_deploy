const express = require("express");
const router = express.Router();
const {
  postInfo,
  patchById,
  getById,
  getInfo,
  getLabs,
  getDepartment,
  getCollege,
  getExplist,
  getLabsfromdepartment,
  getSelectedExplist,
  getUniversity,
  getRespectiveCollege
  
} = require("../controllers/moreInfoController");

const {
  getDepartmentandmemberdetails,
  getlabdetail,
  getlabdetailadmin
} = require("../controllers/detailsController");

router.post("/", postInfo);

router.patch("/edit", patchById);

router.get("/:_id", getById);

router.get("/", getInfo);

router.get("/all/college", getCollege);

router.post("/respectivecollege", getRespectiveCollege);


router.get("/all/university", getUniversity);

router.post("/department", getDepartment);

router.post("/labs", getLabs);

router.post("/experiment",getExplist)

router.post("/labs/depandclg",getLabsfromdepartment)

router.post("/selected",getSelectedExplist)

router.post("/getdetail/university/college",getDepartmentandmemberdetails)
router.post("/getdetail/university/college/department",getlabdetail)
router.post("/getdetail/university/college/department/admin",getlabdetailadmin)

module.exports = router;
