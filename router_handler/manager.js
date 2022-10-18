// 导入数据库操作模块
const db = require('../db/index')

// 获取教师提交信息的处理函数
exports.getSubInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = `select * from users where username=?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.user.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        const sql = `select * from users where admin is null or admin != 1`
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
                // 用户信息获取成功
            res.send({
                status: 0,
                message: '获取用户信息成功！',
                data: results,
            })
        })
    })
}

// 获取教师提交信息的处理函数
exports.getScoreInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = `select * from users where username=?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.user.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        const sql = `select * from students`
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
                // 用户信息获取成功
            res.send({
                status: 0,
                message: '获取用户信息成功！',
                data: results,
            })
        })
    })
}

exports.getScoreInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = `select * from users where username=?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.user.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取学生信息失败！')

        const sql = `select * from students`
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
                // 信息获取成功
            res.send({
                status: 0,
                message: '获取学生信息成功！',
                data: results,
            })
        })
    })
}

// 获取日期的处理函数
exports.getDateInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = `select * from users where username=?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.user.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取日期信息失败！')

        const sql = `select * from manager`
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
                // 信息获取成功
            res.send({
                status: 0,
                message: '获取日期信息成功！',
                data: results,
            })
        })
    })
}

// 获取日期的处理函数
exports.changeDate = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = `select * from users where username=?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.user.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取信息失败！')

        const data = {
            year: req.body.year,
            month: req.body.month,
            day: req.body.day
        }
        const sql = `update manager set ? where id=1`
        db.query(sql, data, (err, results) => {
            if (err) return res.cc(err)
                // 更新成功
            if (results.affectedRows !== 1) return res.cc('更新失败！')
                // 成功
            res.cc('更新成功', 0)
        })
    })
}

// 插入用户的处理函数
exports.addUser = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = `select * from users where username=?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.user.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取信息失败！')

        const data = {
            username: req.body.username,
            password: "123456",
        }
        const sql = `insert into users set ?`
        db.query(sql, data, (err, results) => {
            if (err) return res.cc(err)
                // 成功
            if (results.affectedRows !== 1) return res.cc('插入失败！')
                // 成功
            res.cc('插入成功', 0)
        })
    })
}