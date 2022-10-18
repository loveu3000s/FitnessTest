const db = require('../db/index');
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
    // 导入全局的配置文件
const config = require('../config')

exports.login = (req, res) => {
    // 接收表单的数据
    const userinfo = req.body
        // 定义 SQL 语句
    const sql = `select * from users where username=?`
        // 执行 SQL 语句，根据用户名查询用户的信息
    db.query(sql, userinfo.username, (err, results) => {
        // 执行失败
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败！')

        // 判断密码是否正确
        if (results[0].password != userinfo.password) return res.cc('登录失败！')

        // 在服务器端生成 Token 的字符串
        const user = {...results[0], password: '' }
            // 对用户的信息进行加密，生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
            // 调用 res.send() 将 Token 响应给客户端
        if (results[0].admin == 1) {
            res.send({
                status: 2,
                message: '登录成功！',
                token: 'Bearer ' + tokenStr,
            })
        } else {
            res.send({
                status: 0,
                message: '登录成功！',
                token: 'Bearer ' + tokenStr,
            })
        }
    })
}