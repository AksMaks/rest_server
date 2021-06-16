import express from "express"
import evalidator from "express-validator"
//import controller from "../controllers/Category.js"

const validationResult = evalidator.validationResult

import db from "../models/index.js"
import Sequelize from 'sequelize'

import ErroeHandler from "../utils/ErrorHandler.js"

const router = express.Router()

router.post('/SELECT',
  [], 
  async (req, res) => {
    //const t = await sequelize.transaction();
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
        /*
        let result = await db.Category.findAll({transaction: transaction});
        console.log(result)
        Response.Data = result
        */
        await db.sequelize.query(
          `
          SELECT * 
          FROM category 
          WHERE 1`,
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
)

router.post('/SEARCH',
  [],
  async (req, res) => {
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
        /*
        let result = await db.Category.findOne({
          where: {
            Id: req.body.Data.Id
          }
        },
        {transaction: transaction}
        );
        console.log(result)
        Response.Data = result
        */
        await db.sequelize.query('SELECT * FROM `category` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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
)

router.post('/INSERT',
  [], 
  async (req, res) => {
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(200).json({
          errors: errors.array(),
          message: "Некорректные данные"
        })
      }
      
      const {Name} = req.body.Data
      
      let Response = {}
      
      let newObject = {
        Name: Name
      }
      await db.sequelize.transaction(async  transaction => {
        /*
        let result = await db.Category.create(
          newObject,
          {transaction: transaction}
        );
        console.log(result)
        Response.Data = result
        */
        await db.sequelize.query('INSERT INTO `category` (`Name`) VALUES (?)', {replacements: [newObject.Name]},
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
)

router.post('/UPDATE',
  [], 
  async (req, res) => {
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(200).json({
          errors: errors.array(),
          message: "Некорректные данные"
        })
      }
      
      const {Id, Name} = req.body.Data
     
      let newObject = {
        Name: Name
      }
      
      let Response = {}
      
      await db.sequelize.transaction(async  transaction => {
        /*
        let result = await db.Category.update(
          newObject,
          {
            where: {
              Id: Id
            }
          },
          {transaction: transaction}
        );
        console.log(result)
        Response.Data = result
        */
        await db.sequelize.query('UPDATE `category` SET `Name`=? WHERE Id = ?', {replacements: [Name, Id]},
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
)

router.post('/DELETE',
  [], 
  async (req, res) => {
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
        /*
        let result = await db.Category.destroy(
          {
            where: {
              Id: req.body.Data.Id
            }
          },
          {transaction: transaction}
        );
        console.log(result)
        Response.Data = result
        */
        await db.sequelize.query('DELETE FROM `category` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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
)

export default router