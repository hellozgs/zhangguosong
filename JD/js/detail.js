class Fun {

    // 构造方法
    constructor() {

        this.addCart()
    }

    // leftFn = () => {
    //         console.log(123);
    //     }
    // 获取商品列表
    addCart = () => {
        let sp = localStorage.getItem("sp")
        axios.get('http://localhost:8888/goods/item', {
            params: {
                id: sp
            }
        }).then((res) => {
            let data = res.data
            let html = `
            <div class="main">
                <div class="main-center">
                    <div class="main-L">
                        <div class="main-img">
                            <img src="${data.info.img_big_logo}" alt="">
                            <div class="main-fdj"></div>
                        </div>
                    </div>
                    <div class="main-fd">
                        <img src="${data.info.img_big_logo}" alt="">
                    </div>
                    <!-- 右边部分 -->
                    <div class="main-R">
                        <div class="main-te">${data.info.title}</div>
                        <div class="main-rmb">
                            数量 :
                            <div class="main-num"><input type="button"  class="main-input1"  value="-" ><span class='num'>1</span><input type="button"  class='main-input2'      value='+' ></div>
                        </div>
                        <!-- 价格 -->
                        <div class="main-q">
                            总价 : <span>￥<i>${data.info.price}</i></span>
                        </div>
                        <!-- 抢购 -->
                        <div class="main-btn">
                            <button>立&nbsp;即&nbsp;购&nbsp;买</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-list">
                <div class="main-list-center">
                    <div class="main-text">
                        商品详情
                    </div>
                  <p>${data.info.goods_introduce}</p>
                </div>
            </div>`
            this.$('.info').innerHTML = html;
            this.onEve(data.info.price)
            this.button()
            this.over()
            this.out()

        })
    }
    onEve = (a) => {
            // 减
            this.$('.main-input1').addEventListener('click', (e) => {
                    let q = this.$('.main-q span i')
                    let span = this.$('.num')
                    this.$('.main-input2').style.opacity = '1'
                    let span1 = span.innerText - 0;
                    span1--
                    let aaa = parseInt(span1 * a)
                    q.innerHTML = (aaa * 100) / 100
                    span.innerHTML--
                        if (span.innerHTML <= 0) {
                            this.$('.main-input1').style.opacity = '0.2'
                            span.innerHTML = 0
                        }
                })
                // 加

            this.$('.main-input2').addEventListener('click', (e) => {

                    let q = this.$('.main-q span i')
                    let span = this.$('.num')
                    this.$('.main-input1').style.opacity = '1'
                    let span1 = span.innerText - 0;
                    span1++
                    let aaa = parseInt(span1 * a)
                    q.innerHTML = (aaa * 100) / 100
                    span.innerHTML++
                        if (span.innerHTML >= 99) {
                            this.$('.main-input2').style.opacity = '0.2'
                            span.innerHTML = 99
                        }
                })
                // span.innerHTML--
        }
        //    立即购买效果
        // 点击立即购买判断登录状态,如果登录跳转到购物车,如果没登录跳转到登录页面
    button() {
            let id = localStorage.getItem('user_id')
            let goods = localStorage.getItem('sp')
            let token = localStorage.getItem('token')
            let param = `id=${id}&goodsId=${goods}`
            this.$(".main-btn button").addEventListener('click', (e) => {
                // /cart/add
                const AUTH_TOKEN = localStorage.getItem('token')
                axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
                axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                axios.post('http://localhost:8888/cart/add', param, {
                        id: id,
                        goodsId: goods
                    })
                    .then(function(response) {
                        console.log(response);
                    })



                if (token) location.href = '../html/cart.html'


            })
        }
        // 设置鼠标移入效果
    over() {
        this.$(".main-img").addEventListener('mouseover', (eve) => {
            this.$('.main-fdj').style.display = 'block';
            this.$('.main-fd').style.display = 'block'
            this.move()
        })
    }
    move() {
            // 鼠标移动效果
            this.$(".main-img").addEventListener('mousemove', (eve) => {
                //  计算小黄框能够移动的最大距离
                let left = this.$('.main-img img').offsetWidth - this.$(".main-fdj").offsetWidth
                let top = this.$('.main-img img').offsetHeight - this.$(".main-fdj").offsetHeight
                    //    获取鼠标相对于可视区域的坐标
                let cx = eve.pageX
                let cy = eve.pageY
                    // 获取img的坐标
                let Left = this.$(".main-img img").offsetLeft
                let Top = this.$(".main-img img").offsetTop

                let tmpx = cx - Left - this.$(".main-fdj").offsetWidth / 2
                let tmpy = cy - Top - this.$(".main-fdj").offsetHeight / 2
                    // 设置边界值
                if (tmpx < 0) tmpx = 0
                if (tmpy < 0) tmpy = 0
                if (tmpx > left) tmpx = left
                if (tmpy > top) tmpy = top
                this.$('.main-fdj').style.left = tmpx + 'px'
                this.$('.main-fdj').style.top = tmpy + 'px'
                    // 计算大图能够移动的最大位置
                let wid = this.$(".main-fd img").offsetWidth - this.$(".main-fd").offsetWidth
                let hei = this.$(".main-fd img").offsetHeight - this.$(".main-fd").offsetHeight
                let tmpT = tmpy / top * hei
                let tmpL = tmpx / left * wid
                this.$(".main-fd img").style.left = -tmpL + 'px'
                this.$(".main-fd img").style.top = -tmpT + 'px'
                console.log(this.$(".main-fd img"));

            })
        }
        // 移出效果
    out() {
        this.$(".main-img").addEventListener('mouseout', (eve) => {
            this.$('.main-fdj').style.display = 'none';
            this.$('.main-fd').style.display = 'none'
        })
    }
    $(ele) {
        return document.querySelector(ele) || document.querySelectorAll(ele)
    }
}
new Fun