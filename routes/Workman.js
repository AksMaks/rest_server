import express from "express"
import evalidator from "express-validator"

const validationResult = evalidator.validationResult

import db from "../models/index.js"
import Sequelize from 'sequelize'

import ErroeHandler from "../utils/ErrorHandler.js"

const router = express.Router()

router.post(
  '/SELECT',
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
        await db.sequelize.query('SELECT * FROM `workman` WHERE 1',
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

router.post(
  '/SEARCH',
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
        await db.sequelize.query('SELECT * FROM `workman` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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

router.post(
  '/INSERT',
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
      
      const {Name, IdPosition} = req.body.Data
      
      let Response = {}
      await db.sequelize.transaction(async  transaction => {
        await db.sequelize.query('INSERT INTO `workman` (`Name`, `IdPosition`) VALUES (?, ?)',
          {replacements: [Name, IdPosition]},
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

router.post(
  '/UPDATE',
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
      
      const {Id, Name, IdPosition} = req.body.Data
      
      let Response = {}
      
      await db.sequelize.transaction(async  transaction => {
        await db.sequelize.query('UPDATE `workman` SET `Name`=?, `IdPosition`=? WHERE Id = ?', 
        {replacements: [Name, IdPosition, Id]},
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

router.post(
  '/DELETE',
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
        await db.sequelize.query('DELETE FROM `workman` WHERE Id = ?', {replacements: [req.body.Data.Id]},
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