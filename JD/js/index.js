//头部
// 头部定位的样式设置
// 获取节点
let li = document.querySelector('.head-li')
let box = document.querySelector('.head-box')
let sp = document.querySelector('.sp')
let ulAll = document.querySelectorAll('.head-ul li')
let div = document.querySelector('.head-div')
console.log(div);
let str = ''
ulAll.forEach(function(li) {
    li.onclick = function() {
        str = li.innerText
            // console.log(str);
        sp.innerText = str
            // if (str !== null) location.reload()
    }
})

// 设置鼠标移入效果
li.onmouseover = function() {
    li.style.border = '1px solid #cccccc'
    li.style.borderBottom = '1px solid #fff'
    li.style.background = '#fff'
    div.style.display = 'block'
        // 鼠标移入
    box.onmouseover = function() {
        li.style.border = '1px solid #cccccc'
        li.style.background = '#fff'
        div.style.display = 'block'
    }
}

// 设置鼠标移出效果
li.onmouseout = function() {
    li.style.border = '1px solid #e3e4e5'
    li.style.borderBottom = '1px solid #fff'
    li.style.background = '#e3e4e5'
    div.style.display = 'none'
        // 鼠标移出
    box.onmouseout = function() {
        li.style.border = '1px solid #e3e4e5'
        li.style.borderBottom = '1px solid #fff'
        li.style.background = '#e3e4e5'
        div.style.display = 'none'
    }
}

// 我的京东
// 获取节点
let dj = document.querySelector('.dj')
let da = document.querySelector('.head-da')

// 设置鼠标移入事件
dj.onmouseover = function() {
        da.style.display = 'block'
        da.style.border = '1px solid #ccc'
        dj.style.background = '#fff'
        dj.style.border = '1px solid #cccccc'
        dj.style.borderBottom = '1px solid #fff'
    }
    // 设置鼠标移出
dj.onmouseout = function() {
    dj.style.border = '1px solid #e3e4e5'
    dj.style.background = '#e3e4e5'
    da.style.display = 'none'
}