const express = require('express');
const router = express.Router();

//导入用户路由处理函数模块
const managerHandler = require('../router_handler/manager')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
    // 2. 导入需要的验证规则对象
const { change_date_schema } = require('../schema/manager')

// 获取教师提交信息的路由
router.get('/sub', managerHandler.getSubInfo)

// 获取教师提交信息的路由
router.get('/score', managerHandler.getScoreInfo)

//获取日期的路由
router.get('/date', managerHandler.getDateInfo)

//修改日期的路由
router.post('/newdate', expressJoi(change_date_schema), managerHandler.changeDate)

//插入用户的路由
router.post('/adduser', managerHandler.addUser)

module.exports = router