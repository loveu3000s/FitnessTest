// 导入定义验证规则的包
const joi = require('joi')

// 定义数据的验证规则
const stuClass = joi.string().max(10).required()
const number = joi.string().max(20).required()
const name = joi.string().max(10).required()
const sex = joi.string().max(2).required()
const height = joi.number().required()
const weight = joi.number().required()
const pulmonary = joi.number().required()
const fifty = joi.number().required()
const longJump = joi.number().required()
const sitReach = joi.number().required()
const eightHundred = joi.string().max(10).allow(null, '')
const thousand = joi.string().max(10).allow(null, '')
const sitUp = joi.string().allow(null, '')
const pullUp = joi.string().allow(null, '')
const secondarySchool = joi.string().allow(null, '')
const remark = joi.string().allow(null, '')

// 定义验证注册和登录表单数据的规则对象
exports.add_score_schema = {
    body: {
        stuClass,
        number,
        name,
        sex,
        height,
        weight,
        pulmonary,
        fifty,
        longJump,
        sitReach,
        eightHundred,
        thousand,
        sitUp,
        pullUp,
        secondarySchool,
        remark,
    },
}