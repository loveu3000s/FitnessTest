$(document).ready(function() {
    var year;
    var month;
    var day;
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
                year = res.data[0].year;
                month = res.data[0].month - 1;
                day = res.data[0].day
                str = '提交截止时间' + str;
                $('#endtime').html(str);
            } else {
                console.log(res.message);
            }
        }
    })

    function addZero(data) {
        data = (data < 10 ? '0' : '') + data
        return data
    }

    var results = 0;
    var addResults = 0;
    /*导出excel文件*/
    $("#btnExport").click(function() {
        let flag1 = checkComplete();
        let flag2 = checkTime();
        if (!flag1) {
            alert('数据为空或格式错误，请重新填写！');
            return;
        }
        if (!flag2) {
            alert('提交已截止！');
            return;
        }
        if (flag1 && flag2) {
            getData()
            if (results == $(".tableExcel tbody .datarow").length + 1) {
                alert("导入成功！");
            } else {
                alert("导入失败！");
            }
        }
    });

    // 将数据导入数据库
    function getData() {
        results = 0;
        addResults = 0;
        $(".tableExcel tbody .datarow").each(function(index, element) {
            $.ajax({
                type: 'post',
                url: '/my/addInfo',
                async: false, // 同步
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", sessionStorage.getItem('userToken') || '');
                },
                data: {
                    stuClass: element.children[1].innerHTML,
                    number: element.children[2].innerHTML,
                    name: element.children[3].innerHTML,
                    sex: element.children[4].innerHTML,
                    height: element.children[5].innerHTML,
                    weight: element.children[6].innerHTML,
                    pulmonary: element.children[7].innerHTML,
                    fifty: element.children[8].innerHTML,
                    longJump: element.children[9].innerHTML,
                    sitReach: element.children[10].innerHTML,
                    eightHundred: element.children[11].innerHTML,
                    thousand: element.children[12].innerHTML,
                    sitUp: element.children[13].innerHTML,
                    pullUp: element.children[14].innerHTML,
                    secondarySchool: element.children[15].innerHTML,
                    remark: element.children[16].innerHTML
                },
                success: function(res) {
                    if (res.status === 0) {
                        console.log(res);
                        results++;
                        addResults++;
                    } else if (res.status === 2) {
                        console.log(res);
                        results++;
                    } else {
                        console.log(res.message);
                    }
                }
            })
        });
        //教师提交信息
        $.ajax({
            type: 'post',
            url: '/my/subInfo',
            async: false, // 同步
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", sessionStorage.getItem('userToken') || '');
            },
            data: { headcount: addResults },
            success: function(res) {
                if (res.status === 0) {
                    console.log(res);
                    results++;
                } else {
                    console.log(res.message);
                }
            }
        })
    }

    function checkTime() {
        var myDate = new Date();
        var now = myDate.valueOf();
        console.log(year);
        console.log(month);
        console.log(day);
        var time = new Date(year, month, day, 23, 59, 59).valueOf();
        console.log(now);
        console.log(time);
        if (now < time) {
            return true;
        } else {
            return false;
        }
    }

    function checkComplete() {
        var flag = true;
        var data = document.querySelectorAll('.modify');
        // console.log(data[0].nextSibling.className);
        for (let i = 0; i < data.length; i++) {
            let stuSex = data[i].parentNode.children[4].innerHTML;
            if ((data[i].innerHTML == '' || data[i].classList.contains('change')) && (data[i].className.indexOf('sex') != -1 || data[i].className.indexOf('height') != -1 || data[i].className.indexOf('weight') != -1 || data[i].className.indexOf('pulmonary') != -1 || data[i].className.indexOf('fifty') != -1 || data[i].className.indexOf('longJump') != -1 || data[i].className.indexOf('sitReach') != -1)) {
                data[i].classList.add('change');
                flag = false;
            }
            if ((data[i].innerHTML == '' || data[i].classList.contains('change')) && (data[i].className.indexOf('eightHundred') != -1 || data[i].className.indexOf('sitUp') != -1) && stuSex == '女') {
                data[i].classList.add('change');
                flag = false;
            }
            if ((data[i].innerHTML == '' || data[i].classList.contains('change')) && (data[i].className.indexOf('thousand') != -1 || data[i].className.indexOf('pullUp') != -1) && stuSex == '男') {
                data[i].classList.add('change');
                flag = false;
            }
            // 清空不匹配的项目
            if (stuSex == '女') {
                data[i].parentNode.children[12].classList.remove('change');
                data[i].parentNode.children[14].classList.remove('change');
                data[i].parentNode.children[12].innerHTML = "";
                data[i].parentNode.children[14].innerHTML = "";
            }
            if (stuSex == '男') {
                data[i].parentNode.children[11].classList.remove('change');
                data[i].parentNode.children[13].classList.remove('change');
                data[i].parentNode.children[11].innerHTML = "";
                data[i].parentNode.children[13].innerHTML = "";
            }
            // console.log(flag);
        }
        return flag;
    };

    /*导入excel文件*/
    document.querySelector('#excel').onchange = function(e) {
        let file = e.target.files[0];
        readWorkbookFromLocalFile(file, function(workbook) {
            readWorkbook(workbook);
        });
    }

    // 读取本地excel文件，读取Excel文件对象
    function readWorkbookFromLocalFile(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });
            // console.log(workbook);
            if (callback) callback(workbook);
        };
        reader.readAsBinaryString(file);
    }
    // 转成cvs 注意Execel表格内容不能包含英文,否则解析出来的数据格式会有问题
    function readWorkbook(workbook) {
        var sheetNames = workbook.SheetNames;
        var worksheet = workbook.Sheets[sheetNames[0]]; // 读取第一张sheet
        var csv = XLSX.utils.sheet_to_csv(worksheet);
        // console.log(csv);
        var rows = csv.split('\n');
        // rows.pop();
        // console.log(rows);
        // 将数据写入表格
        tdClear();
        var dataHtml = '';
        for (let i = 0; i < rows.length; i++) {
            var bugdetData = rows[i].split(',');
            var n = Number(bugdetData[0])
            console.log(n);
            if (isNaN(n) || bugdetData[0] === '') {
                continue;
            }
            dataHtml += '<tr class="datarow">';
            dataHtml += '<td>' + (bugdetData[0] || '') + '</td>';
            dataHtml += '<td class="modify stuClass">' + (bugdetData[1] || '') + '</td>';
            dataHtml += '<td class="modify stuNumber">' + (bugdetData[2] || '') + '</td>';
            dataHtml += '<td class="modify name">' + (bugdetData[3] || '') + '</td>';
            dataHtml += '<td class="modify sex">' + (bugdetData[4] || '') + '</td>';
            dataHtml += '<td class="modify height">' + (bugdetData[5] || '') + '</td>';
            dataHtml += '<td class="modify weight">' + (bugdetData[6] || '') + '</td>';
            dataHtml += '<td class="modify pulmonary">' + (bugdetData[7] || '') + '</td>';
            dataHtml += '<td class="modify fifty">' + (bugdetData[8] || '') + '</td>';
            dataHtml += '<td class="modify longJump">' + (bugdetData[9] || '') + '</td>';
            dataHtml += '<td class="modify sitReach">' + (bugdetData[10] || '') + '</td>';
            dataHtml += '<td class="modify eightHundred">' + (bugdetData[11] || '') + '</td>';
            dataHtml += '<td class="modify thousand">' + (bugdetData[12] || '') + '</td>';
            dataHtml += '<td class="modify sitUp">' + (bugdetData[13] || '') + '</td>';
            dataHtml += '<td class="modify pullUp">' + (bugdetData[14] || '') + '</td>';
            dataHtml += '<td class="modify secondarySchool">' + (bugdetData[15] || '') + '</td>';
            dataHtml += '<td class="modify remark">' + (bugdetData[16] || '') + '</td>';
            dataHtml += '</tr>';
        }
        $('table#dgBudget>tbody>tr:last-child').after(dataHtml);
        firstCheck();
        checkComplete();
    }

    function tdClear() {
        var table = document.querySelectorAll('.tableExcel tbody tr');
        while (table.length > 1) {
            $('.tableExcel>tbody>tr:last-child').remove();
            table = document.querySelectorAll('.tableExcel tbody tr');
        }
    }

    /*上传信息后验证格式*/
    function firstCheck() {
        var data = document.querySelectorAll('.modify');
        for (let i = 0; i < data.length; i++) {
            if (data[i].innerHTML != '' && !checkInfo(data[i].className, data[i].innerHTML)) {
                // 格式错误背景变成黄色
                // data[i].innerHTML = '';
                data[i].classList.add('change');
            }
        }
    }

    /*修改和添加数据*/
    $(document).on('click', '.modify', function() {
        var that = this;
        if (checkBlank(this)) {
            // 项目类型不匹配
            return;
        }
        var str = this.innerHTML;
        var hasChange = this.classList.contains('change');
        this.classList.remove('change');
        this.innerHTML = '<input type="text" class="inputStyle">';
        var input = this.children[0];
        input.value = str;
        input.select();
        // 失去焦点
        input.onblur = function() {
            this.value = this.value.trim();
            if (this.value == '') {
                that.classList.add('change');
                this.parentNode.innerHTML = this.value;
                checkBlank(that);
            } else if (checkInfo(this.parentNode.className, this.value)) {
                // console.log("ok");
                this.parentNode.innerHTML = this.value;
                // 修改性别特判
                let stuSex = that.parentNode.children[4].innerHTML;
                if (stuSex == '女') {
                    changeToGirl(that);
                } else if (stuSex == '男') {
                    changeToBoy(that);
                }
            } else {
                that.classList.add('change');
                this.parentNode.innerHTML = this.value;
            }
        };
        // 按下回车
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    })

    function changeToGirl(that) {
        that.parentNode.children[12].classList.remove('change');
        that.parentNode.children[12].innerHTML = '';
        that.parentNode.children[14].classList.remove('change');
        that.parentNode.children[14].innerHTML = '';
        if (!checkInfo(that.parentNode.children[11].className, that.parentNode.children[11].innerHTML)) {
            that.parentNode.children[11].classList.add('change');
        };
        if (!checkInfo(that.parentNode.children[13].className, that.parentNode.children[13].innerHTML)) {
            that.parentNode.children[13].classList.add('change')
        };
    }

    function changeToBoy(that) {
        that.parentNode.children[11].classList.remove('change');
        that.parentNode.children[11].innerHTML = '';
        that.parentNode.children[13].classList.remove('change');
        that.parentNode.children[13].innerHTML = '';
        if (!checkInfo(that.parentNode.children[12].className, that.parentNode.children[12].innerHTML)) {
            that.parentNode.children[12].classList.add('change');
        };
        if (!checkInfo(that.parentNode.children[14].className, that.parentNode.children[14].innerHTML)) {
            that.parentNode.children[14].classList.add('change')
        };
    }

    function checkBlank(that) {
        let stuSex = that.parentNode.children[4].innerHTML;
        if ((that.className.indexOf('eightHundred') != -1 || that.className.indexOf('sitUp') != -1) && stuSex != '女') {
            that.classList.remove('change');
            return true;
        }
        if ((that.className.indexOf('thousand') != -1 || that.className.indexOf('pullUp') != -1) && stuSex != '男') {
            that.classList.remove('change');
            return true;
        }
        if ((that.className.indexOf('secondarySchool') != -1 || that.className.indexOf('remark') != -1)) {
            that.classList.remove('change');
        }
        return false;
    }

    /*判断数据格式*/
    function checkInfo(className, str) {
        str = str.trim();
        if (className.indexOf("name") >= 0) {
            let re = /^[\u4e00-\u9fa5]+·*[\u4e00-\u9fa5]*$/;
            if (str.search(re) != -1) {
                return true;
            }
        } else if (className.indexOf("stuNumber") >= 0) {
            let re = /^[0-9]+$/;
            if (str.search(re) != -1) {
                return true;
            }
        } else if (className.indexOf("stuClass") >= 0) {
            let re = /^[^0-9]+[0-9]+$/;
            if (str.search(re) != -1) {
                return true;
            }
        } else if (className.indexOf("sex") >= 0) {
            if (str === '男' || str === '女') {
                return true;
            }
        } else if (className.indexOf("height") >= 0) {
            if (str >= 100 && str <= 220) {
                return true;
            }
        } else if (className.indexOf("weight") >= 0) {
            if (str >= 20 && str <= 300) {
                return true;
            }
        } else if (className.indexOf("pulmonary") >= 0) {
            let re = /^(0|[1-9][0-9]*)$/;
            if (str >= 500 && str <= 9999 && str.search(re) != -1) {
                return true;
            }
        } else if (className.indexOf("fifty") >= 0) {
            if (str >= 5 && str <= 20) {
                return true;
            }
        } else if (className.indexOf("longJump") >= 0) {
            if (str >= 50 && str <= 400) {
                return true;
            }
        } else if (className.indexOf("sitReach") >= 0) {
            if (str >= -30 && str <= 40) {
                return true;
            }
        } else if (className.indexOf("eightHundred") >= 0) {
            let re = /^(0|[1-9][0-9]*)'[0-5][0-9]$/;
            if (str.search(re) != -1) {
                return true;
            }
        } else if (className.indexOf("thousand") >= 0) {
            let re = /^(0|[1-9][0-9]*)'[0-5][0-9]$/;
            if (str.search(re) != -1) {
                return true;
            }
        } else if (className.indexOf("sitUp") >= 0) {
            let re = /^(0|[1-9][0-9]*)$/;
            if (str >= 0 && str <= 99 && str.search(re) != -1) {
                return true;
            }
        } else if (className.indexOf("pullUp") >= 0) {
            let re = /^(0|[1-9][0-9]*)$/;
            if (str >= 0 && str <= 99 && str.search(re) != -1) {
                return true;
            }
        } else if (className.indexOf("secondarySchool") >= 0) {
            let re = /^[\u4e00-\u9fa5]{0,}$/;
            if (str.search(re) != -1) {
                return true;
            }
        } else {
            return true;
        }
        return false;
    }
});