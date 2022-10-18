// 导入数据库操作模块
const db = require('../db/index')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = `select id, username from users where id=?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        // 用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0],
        })
    })
}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
    // 根据 id 查询用户的信息
    const sql = `select * from users where id=?`
        // 执行根据 id 查询用户的信息的 SQL 语句
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在！')

        // 判断密码是否正确
        if (results[0].password != req.body.oldPwd) return res.cc('旧密码错误！')

        // 定义更新密码的 SQL 语句
        const sql = `update users set password=? where id=?`
            // 对新密码进行加密处理
        const newPwd = req.body.newPwd
            // 调用 db.query() 执行 SQL 语句
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
                // 成功
            res.cc('更新密码成功', 0)
        })
    })
}

// 添加数据的处理函数
exports.addInfo = (req, res) => {
    // console.log(req.body);
    // 定义查重的语句
    const sql = `select * from students where number=?`
        // 执行查重的 SQL 语句
    db.query(sql, req.body.number, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断数据的 length
        if (results.length === 1) {
            // 已有该数据 更新数据
            const score = {
                stuClass: req.body.stuClass,
                name: req.body.name,
                sex: req.body.sex,
                height: req.body.height,
                weight: req.body.weight,
                pulmonary: req.body.pulmonary,
                fifty: req.body.fifty,
                longJump: req.body.longJump,
                sitReach: req.body.sitReach,
                eightHundred: req.body.eightHundred,
                thousand: req.body.thousand,
                sitUp: req.body.sitUp,
                pullUp: req.body.pullUp,
                secondarySchool: req.body.secondarySchool,
                remark: req.body.remark
            };
            const sql = `update students set ? where number=?`
            db.query(sql, [score, req.body.number], (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) return res.cc('更新数据失败！')
                res.cc('更新数据成功！', 2)
            })
        } else {
            // 定义添加数据的 SQL 语句
            const sql = `insert into students set ?`
                // 执行添加数据的 SQL 语句
            db.query(sql, req.body, (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) return res.cc('添加数据失败！')
                res.cc('添加数据成功！', 0)
            })
        }
    })
}

// 添加教师提交信息的处理函数
exports.subInfo = (req, res) => {
    // console.log(req.body);
    // 定义查重的语句
    const sql = `select * from users where id=?`
        // 执行查重的 SQL 语句
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        let now = new Date();
        let year = now.getFullYear(); //获取完整的年份(4位,1970-????)
        let month = now.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        let today = now.getDate(); //获取当前日(1-31)
        let hour = now.getHours(); //获取当前小时数(0-23)
        let minute = now.getMinutes(); //获取当前分钟数(0-59)
        let second = now.getSeconds(); //获取当前秒数(0-59)
        let nowTime = ''
        nowTime = year + '-' + fillZero(month) + '-' + fillZero(today) + ' ' + fillZero(hour) + ':' +
            fillZero(minute) + ':' + fillZero(second)
        let num = 0;
        if (results[0].headcount) {
            num = Number(results[0].headcount);
        }
        num += req.body.headcount
        const data = { submit: nowTime, headcount: num }
        const sql = `update users set ? where id=?`
        db.query(sql, [data, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新教师数据失败！')
            res.cc('更新教师数据成功！', 0)
        })
    })
}

function fillZero(str) {
    var realNum;
    if (str < 10) {
        realNum = '0' + str;
    } else {
        realNum = str;
    }
    return realNum;
}