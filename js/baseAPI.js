$.ajaxPrefilter(function(options) {
    // 在发起 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:3007' + options.url

    options.complete = function(res) {
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            sessionStorage.removeItem('userToken')
                // 2. 强制跳转到登录页面
            location.href = '../index.html'
        }
    }
})