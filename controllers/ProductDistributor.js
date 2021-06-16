const {check, validationResult} = require("express-validator")

let db = require("../models/index.js");
const ErroeHandler = require("../utils/ErrorHandler")

module.exports.Get = async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('SELECT * FROM `product_distributor` WHERE 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        console.log(result)
        Response.Data = result
      })
    })
    
    Response.message = "Ok"
    return res.status(200).json(Response)
  }
  catch (e) {
    ErroeHandler(res, e)
  }
}

module.exports.Search = async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    let Response = {}
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('SELECT * FROM `product_distributor` WHERE Id = ?', {replacements: [req.body.Data.Id]},
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        console.log(result)
        Response.Data = result
      })
    })
    Response.message = "Ok"
    return res.status(200).json(Response)
  }
  catch (e) {
    ErroeHandler(res, e)
  }
}

module.exports.Insert = async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    const {IdProduct, IdDistributor} = req.body.Data
    
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('INSERT INTO `product_distributor` (`IdProduct`, `IdDistributor`) VALUES (?, ?)',
        {replacements: [IdProduct, IdDistributor]},
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      ).then(result => {
        console.log(result)
        Response.message = "Запись добавлена"
        Response.Data = result
      })
    })
    
    return res.status(200).json(Response)
  } 
  catch (e) {
    ErroeHandler(res, e)
  }
}

module.exports.Update = async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    const {Name, IdProduct, IdDistributor} = req.body.Data
    
    let Response = {}
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('UPDATE `product_distributor` SET `Name`=?, `IdProduct`=?, `IdDistributor`=? WHERE Id = ?', 
      {replacements: [Name, IdProduct, IdDistributor, Id]},
      {
        type: db.sequelize.QueryTypes.INSERT,
        transaction: transaction
      }
      ).then(result => {
        console.log(result)
        Response.message = "Обьект изменен"
        Response.Data = result
      })
    })
    
    return res.status(200).json(Response)
  } 
  catch (e) {
    ErroeHandler(res, e)
  }
}

module.exports.Delete = async (req, res) => {
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(200).json({
        errors: errors.array(),
        message: "Некорректные данные"
      })
    }
    
    let Response = {}
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('DELETE FROM `product_distributor` WHERE Id = ?', {replacements: [req.body.Data.Id]},
      {
        type: db.sequelize.QueryTypes.INSERT,
        transaction: transaction
      }
      ).then(result => {
        console.log(result)
        Response.message = "Обьект удален"
        Response.Data = result
      })
    })
    
    return res.status(200).json(Response)
  } 
  catch (e) {
    ErroeHandler(res, e)
  }
}