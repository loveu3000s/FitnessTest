var input_name = '';
var input_oldPwd = '';
var input_newPwd = '';

$('.reset').unbind('click').bind('click', function() {
    input_name = $('.username').val();
    input_oldPwd = $('.oldPwd').val();
    input_newPwd = $('.newPwd').val();
    $.ajax({
        type: 'post',
        url: '/api/login',
        data: { username: input_name, password: input_oldPwd },
        success: function(res) {
            if (res.status === 0) {
                // console.log('ok1');
                // console.log(res.token);
                updatePassword(res.token);
            } else {
                alert("用户名或密码错误！")
            }
        }
    })
})

function updatePassword(token) {
    $.ajax({
        type: 'post',
        url: '/my/updatepwd',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        data: { oldPwd: input_oldPwd, newPwd: input_newPwd },
        success: function(res) {
            if (res.status === 0) {
                // console.log("ok2");
                document.querySelector('.cont_form_join').style.bottom = '-420px';
                setTimeout(function() {
                    window.open("../index.html", "_self");
                }, 500);
            }
            console.log(res);
        }
    })
}