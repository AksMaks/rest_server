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
      await db.sequelize.query('SELECT * FROM `product` WHERE 1',
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
      await db.sequelize.query('SELECT * FROM `product` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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
    
    const {Name, IdCategory, IdUnit, IdDistributor} = req.body.Data
    
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('INSERT INTO `product` (`Name`, `IdCategory`, `IdUnit`) VALUES (?, ?, ?)',
        {replacements: [Name, IdCategory, IdUnit]},
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      ).then(result => {
        console.log(result)
      })
      let q = "";
      await db.sequelize.query('SELECT * FROM `product` ORDER BY Id DESC LIMIT 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result1 => {
        console.log("asd")
        console.log(result1)
        IdDistributor.forEach(el => {
          if(el.Flag) q+= "INSERT INTO `product_distributor` (`IdProduct`, `IdDistributor`) VALUES ("+result1[0].Id+","+el.Id+");";
        });
      })
      await db.sequelize.query(q,
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      ).then(result => {
        console.log(result)
        Response.message = "Запись добавлена"
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
    const {Id, Name, IdCategory, IdUnit, IdDistributor} = req.body.Data
    
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('UPDATE `product` SET `Name`=?, `IdCategory`=?, `IdUnit`=? WHERE Id = ?', 
      {replacements: [Name, IdCategory, IdUnit, Id]},
      {
        type: db.sequelize.QueryTypes.INSERT,
        transaction: transaction
      }
      ).then(result => {
        console.log(result)
      })
      let q = "";
      await db.sequelize.query('DELETE FROM `product_distributor` WHERE IdProduct = ?', {replacements: [Id]},
      {
        type: db.sequelize.QueryTypes.INSERT,
        transaction: transaction
      }
      ).then(result => {
        console.log(result)
      })
      IdDistributor.forEach(el => {
        if(el.Flag) q+= "INSERT INTO `product_distributor` (`IdProduct`, `IdDistributor`) VALUES ("+Id+","+el.Id+");";
      });
      await db.sequelize.query(q,
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      ).then(result => {
        console.log(result)
        Response.message = "Запись изменена"
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
      await db.sequelize.query('DELETE FROM `product` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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