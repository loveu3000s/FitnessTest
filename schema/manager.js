const joi = require('joi')

// 定义数据的验证规则
const year = joi.number().required()
const month = joi.number().required()
const day = joi.number().required()


// 定义验证注册和登录表单数据的规则对象
exports.change_date_schema = {
    body: {
        year,
        month,
        day,
    },
}