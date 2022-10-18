// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().min(1).max(10).required()
const password = joi
    .string()
    .pattern(/^[\S]{4,12}$/)
    .required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}


// 验证规则对象 - 更新密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}

// 验证规则对象 - 教师信息
exports.add_submit_schema = {
    body: {
        headcount: joi.number().required(),
    },
}