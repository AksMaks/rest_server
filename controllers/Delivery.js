const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
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
      await db.sequelize.query('SELECT * FROM `delivery` WHERE 1',
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
      await db.sequelize.query('SELECT * FROM `delivery` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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
    
    const {Date, IdWorkman, IdDistributor} = req.body.Data
    
    let newObject = {
      Date: Date,
      IdWorkman: IdWorkman,
      IdDistributor: IdDistributor
    }
    
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('INSERT INTO `delivery` (`Date`, `IdWorkman`, `IdDistributor`) VALUES (?, ?, ?)',
        {replacements: [Date, IdWorkman, IdDistributor]},
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
    
    const {Id, Date, IdWorkman, IdDistributor} = req.body.Data
    
    let newObject = {
      Date: Date,
      IdWorkman: IdWorkman,
      IdDistributor: IdDistributor
    }
    
    let Response = {}
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('UPDATE `delivery` SET `Date`=?, `IdWorkman`=?, `IdDistributor`=? WHERE Id = ?', 
      {replacements: [Date, IdWorkman, IdDistributor, Id]},
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
      await db.sequelize.query('DELETE FROM `delivery` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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