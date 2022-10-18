const express = require('express')
const router = express.Router()

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
    // 导入需要的验证规则对象
const { update_password_schema } = require('../schema/user')
const { add_score_schema } = require('../schema/score')
const { add_submit_schema } = require('../schema/user')

// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 添加数据的路由
router.post('/addinfo', expressJoi(add_score_schema), userinfo_handler.addInfo)

// 添加教师提交信息的路由
router.post('/subinfo', expressJoi(add_submit_schema), userinfo_handler.subInfo)

module.exports = router