$(document).ready(function() {
    // 用户信息
    getUserData();

    function getUserData() {
        $.ajax({
            type: 'get',
            url: '/admin/sub',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", sessionStorage.getItem('userToken') || '');
            },
            success: function(res) {
                if (res.status === 0) {
                    addUsersData(res.data)
                } else {
                    console.log(res.message);
                }
            }
        })
    }


    // 学生数据
    $.ajax({
        type: 'get',
        url: '/admin/score',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", sessionStorage.getItem('userToken') || '');
        },
        success: function(res) {
            if (res.status === 0) {
                addStudentsData(res.data)
            } else {
                console.log(res.message);
            }
        }
    })

    // 日期数据
    $.ajax({
        type: 'get',
        url: '/admin/date',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", sessionStorage.getItem('userToken') || '');
        },
        success: function(res) {
            if (res.status === 0) {
                let str = addZero(res.data[0].year) + '-' + addZero(res.data[0].month) + '-' + addZero(res.data[0].day);
                $('#mydatepicker2').val(str);
            } else {
                console.log(res.message);
            }
        }
    })

    function addZero(data) {
        data = (data < 10 ? '0' : '') + data
        return data
    }

    function addUsersData(data) {
        tdClearUser();
        var dataHtml = '';
        for (let i = 0; i < data.length; i++) {
            dataHtml += '<tr>';
            dataHtml += '<td>' + (i + 1) + '</td>';
            dataHtml += '<td>' + (data[i].username || '') + '</td>';
            dataHtml += '<td>' + (data[i].password || '') + '</td>';
            dataHtml += '<td>' + (data[i].submit || '') + '</td>';
            dataHtml += '<td>' + (data[i].headcount || '0') + '</td>';
            dataHtml += '</tr>';
        }
        $('.users>tbody>tr:last-child').after(dataHtml);
    }

    function addStudentsData(data) {
        tdClearStu();
        var dataHtml = '';
        for (let i = 0; i < data.length; i++) {
            dataHtml += '<tr>';
            dataHtml += '<td>' + (i + 1) + '</td>';
            dataHtml += '<td>' + (data[i].stuClass || '') + '</td>';
            dataHtml += '<td>' + (data[i].number || '') + '</td>';
            dataHtml += '<td>' + (data[i].name || '') + '</td>';
            dataHtml += '<td>' + (data[i].sex || '') + '</td>';
            dataHtml += '<td>' + (data[i].height || '') + '</td>';
            dataHtml += '<td>' + (data[i].weight || '') + '</td>';
            dataHtml += '<td>' + (data[i].pulmonary || '') + '</td>';
            dataHtml += '<td>' + (data[i].fifty || '') + '</td>';
            dataHtml += '<td>' + (data[i].longJump || '') + '</td>';
            dataHtml += '<td>' + (data[i].sitReach || '') + '</td>';
            dataHtml += '<td>' + (data[i].eightHundred || '') + '</td>';
            dataHtml += '<td>' + (data[i].thousand || '') + '</td>';
            dataHtml += '<td>' + (data[i].sitUp || '') + '</td>';
            dataHtml += '<td>' + (data[i].pullUp || '') + '</td>';
            dataHtml += '<td>' + (data[i].secondarySchool || '') + '</td>';
            dataHtml += '<td>' + (data[i].remark || '') + '</td>';
            dataHtml += '</tr>';
        }
        $('.students>tbody>tr:last-child').after(dataHtml);
    }

    function tdClearUser() {
        var table = document.querySelectorAll('.users tbody tr');
        while (table.length > 1) {
            $('.users>tbody>tr:last-child').remove();
            table = document.querySelectorAll('.users tbody tr');
        }
    }

    function tdClearStu() {
        var table = document.querySelectorAll('.students tbody tr');
        while (table.length > 1) {
            $('.students>tbody>tr:last-child').remove();
            table = document.querySelectorAll('.students tbody tr');
        }
    }

    $('.sendData').click(function() {
        let str = $('#mydatepicker2').val();
        let date = str.split('-');
        $.ajax({
            type: 'post',
            url: '/admin/newdate',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", sessionStorage.getItem('userToken') || '');
            },
            data: {
                year: Number(date[0]),
                month: Number(date[1]),
                day: Number(date[2])
            },
            success: function(res) {
                if (res.status === 0) {
                    console.log(res);
                    alert("修改成功！");
                } else {
                    console.log(res.message);
                    alert("修改失败！");
                }
            }
        })
    })

    $('.sendUser').click(function() {
        let str = $('#userData').val();
        $.ajax({
            type: 'post',
            url: '/admin/adduser',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", sessionStorage.getItem('userToken') || '');
            },
            data: {
                username: str
            },
            success: function(res) {
                if (res.status === 0) {
                    console.log(res);
                    alert("添加成功！");
                    getUserData();
                } else {
                    console.log(res.message);
                    alert("添加失败！");
                }
            }
        })
    })

    // 导出excel
    $('.getScore').click(function() {
        console.log('ok');
        $(".tableExcel").table2excel({
            exclude: ".excludeThisClass",
            name: "Worksheet Name",
            filename: "学生成绩.xls", // 是否包含扩展名
            preserveColors: false // 如果要保留背景颜色和字体颜色，请设置为 true 
        });
    })

})