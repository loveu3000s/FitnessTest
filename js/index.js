$('.into').unbind('click').bind('click', function() {
    var input_name = $('.username').val();
    var input_pwd = $('.password').val();

    $.ajax({
        type: 'post',
        url: '/api/login',
        data: { username: input_name, password: input_pwd },
        success: function(res) {
            if (res.status === 0) {
                // console.log(res);
                document.querySelector('.cont_form_join').style.bottom = '-420px';
                setTimeout(function() {
                    window.open("page/operate.html", "_self");
                    sessionStorage.setItem('userToken', res.token);
                }, 500);
            } else if (res.status === 2) {
                document.querySelector('.cont_form_join').style.bottom = '-420px';
                setTimeout(function() {
                    window.open("page/manage.html", "_self");
                    sessionStorage.setItem('userToken', res.token);
                }, 500);
            } else {
                alert("用户名或密码错误！")
            }
        }
    })
})