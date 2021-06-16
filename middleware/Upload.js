const multer = require("multer")
const moment = require("moment")

const storage = multer.diskStorage({
  destination(req, file, cd){
    cd(null, "uploads/")
  },
  filename(req, file, cd){
    const date = moment().format("DDMMYYYY-HHmmss_SSS") 
    cd(null, date + "-" + file.originalname)
  }
})

const fileFilter = (req, file, cd) =>{
  if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"){
    cd(null, true)
  }else{
    cd(null, false)
  }
}

const limits = {
  fileSize: 1024*1024*5
}

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
})