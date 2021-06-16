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
      await db.sequelize.query('SELECT * FROM `distributor` WHERE 1',
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
      await db.sequelize.query('SELECT * FROM `distributor` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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
    
    const {Name, IdProduct} = req.body.Data
    
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('INSERT INTO `distributor` (`Name`) VALUES (?)',
        {replacements: [Name]},
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      ).then(result => {
        console.log(result)
        Response.message = "Запись добавлена"
        Response.Data = result
      })
      let q = "";
      await db.sequelize.query('SELECT * FROM `distributor` ORDER BY Id DESC LIMIT 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result1 => {
        console.log("asd")
        console.log(result1)
        IdProduct.forEach(el => {
          if(el.Flag) q+= "INSERT INTO `product_distributor` (`IdProduct`, `IdDistributor`) VALUES ("+el.Id+","+result1[0].Id+");";
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
    
    const {Id, Name, IdProduct} = req.body.Data
    
    let Response = {}
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query('UPDATE `distributor` SET `Name`=? WHERE Id = ?', 
      {replacements: [Name, Id]},
      {
        type: db.sequelize.QueryTypes.INSERT,
        transaction: transaction
      }
      ).then(result => {
        console.log(result)
        Response.message = "Обьект изменен"
        Response.Data = result
      })
      let q = "";
      await db.sequelize.query('DELETE FROM `product_distributor` WHERE IdDistributor = ?', {replacements: [Id]},
      {
        type: db.sequelize.QueryTypes.INSERT,
        transaction: transaction
      }
      ).then(result => {
        console.log(result)
      })
      IdProduct.forEach(el => {
        if(el.Flag) q+= "INSERT INTO `product_distributor` (`IdProduct`, `IdDistributor`) VALUES ("+el.Id+","+Id+");";
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
      await db.sequelize.query('DELETE FROM `distributor` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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