//头部
// 头部定位的样式设置
// 获取节点
let li = document.querySelector('.head-li')
let box = document.querySelector('.head-box')
let sp = document.querySelector('.sp')
let ulAll = document.querySelectorAll('.head-ul li')
let div = document.querySelector('.head-div')
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


// 限时秒杀
class Fn {
    constructor() {
            this.tiem()
            this.git()
            this.on()
                // 默认页码
            this.currentPage = 1;
            // 使用锁
            this.lock = false;
        }
        // 事件
    on() {
        this.$('.main-ul').addEventListener('click', this.ul)
        window.addEventListener('scroll', this.lazy)
    }
    tiem() {
            //  获取节点
            var s1 = this.$('.data-s1')
            var s2 = this.$('.data-s2')
            var s3 = this.$('.data-s3')
                // 运动函数
            var res = setInterval(function() {
                // 创建时间对象
                let date = new Date()
                    // 自定义结束时间
                let newDate = new Date('2022/10/1')
                    // 获取时间差
                let cha = newDate - date
                    // 进行时间转换
                let h = parseInt(cha / 1000 / 60 / 60 / 24)
                let m = parseInt(cha / 1000 / 60 / 60 % 24)
                let f = parseInt((cha / 1000 / 60) % 60)
                if (h < 10) h = '0' + h
                if (m < 10) m = '0' + m
                if (f < 10) f = '0' + f
                s1.innerHTML = h
                s2.innerHTML = m
                s3.innerHTML = f
                if (cha < 0) {
                    clearInterval(res)
                }
            }, 1000)
        }
        // 发送axios请求进行对商品页面的渲染
    git(page = 1) {
            axios.get('http://localhost:8888/goods/list?current=' + page)
                .then((res) => {
                    let { data, status, } = res
                    if (status == 200 && data.code == 1) {
                        let html = ''
                        data.list.forEach((eve) => {
                                html += `
                            <li class='bttt'data-id="${eve.goods_id}">
                            <div class="li-img">
                                <img src="${eve.img_big_logo}" alt="">
                            </div>
                            <h4>${eve.title}</h4>
                            <p>
                                <img src="../image/自营.png" alt="">
                            </p>
                            <div class="main-top">
                                <span>￥${eve.price}</span>
                                <button class='bttt'>立即抢购</button>
                            </div>
                        </li>
                            `
                            })
                            // 进行页面的的追加
                        this.$('.main-ul').innerHTML += html
                    }
                })
        }
        //点击立即抢购 使用事件委托
    ul = (eve) => {
        let tar = eve.target
            // 判断点击的标签
        if (tar.nodeName != 'BUTTON' || tar.className != 'bttt') return
            // 判断用户是否登录,如果没有登录那么就跳转到登录页面
        let token = localStorage.getItem('token')
        if (!token) location.assign('../html/login.html?ReturnUrl=../html/index.html')
            // 如果登录了就跳转到详情页
        if (token) location.href = '../html/detail.html'
            // 获取商品id
        let goodsId = eve.target.parentNode.parentNode.dataset.id;
        // 本地存储商品id
        localStorage.setItem("sp", goodsId)

    }

    // 懒加载
    lazy = () => {
        // 需要滚动条高度,可视区高度,实际内容高度
        let top = document.documentElement.scrollTop;
        let cliH = document.documentElement.clientHeight;
        let conH = this.$('.data-jd').offsetHeight;
        // 但滚动条高度+可视区的高度> 实际内容高度时,就加载新数据
        if (top + cliH > (conH + 500)) {
            // 一瞬间就满足条件,会不停的触发数据加载,使用节流和防抖

            // 如果是锁着的,就结束代码执行
            if (this.lock) return;
            this.lock = true;
            // 指定时间开锁,才能进行下次数据清除
            setTimeout(() => {
                    this.lock = false;
                }, 1000)
                // console.log(1111);
            this.git(++this.currentPage)
        }
    }
    $(ele) {
        return document.querySelector(ele) || document.querySelectorAll(ele)
    }
}

let p = new Fn