class Fn {

    constructor() {
            this.get()
            this.$('.cart-list').addEventListener('click', this.remove)

            this.$('.cart-th input').addEventListener('click', this.check);

        }
        // 删除
    remove = (eve) => {
            let target = eve.target;
            // 判断当前点击的是删除的a标签
            if (target.nodeName == 'A' && target.classList.contains('del1')) {
                this.del(target)
            }
        }
        // 全选
    check = (eve) => {
        let alls = eve.target.checked;
        console.log(alls);
        this.All(alls)
    }
    All = (e) => {
        let input = document.querySelectorAll('.good-checkbox')

        input.forEach(i => {
            i.checked = e
        })
    }
    del(eve) {
        //  用户id
        let uId = localStorage.getItem('user_id');
        // 商品id
        let ul = eve.parentNode.parentNode.parentNode
        let gid = ul.dataset.id
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        axios.get('http://localhost:8888/cart/remove', {
            params: {
                id: uId,
                goodsId: gid
            }
        }).then(res => {
            // 删除本身
            ul.remove();

        })
    }
    async get() {
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        let res = await axios.get('http://localhost:8888/cart/list', {
            params: {
                id: localStorage.getItem('user_id')
            }
        })
        let { data, status } = res
        let html = ''
        data.cart.forEach(function(eve) {
            html += `
         <ul class="goods-list yui3-g" data-id='${eve.goods_id}'>
                                    <li class="yui3-u-3-8 pr">
                                        <input type="checkbox" class="good-checkbox">
                                        <div class="good-item">
                                            <div class="item-img">
                                                <img src="${eve.img_small_logo}">
                                            </div>
                                            <div class="item-msg">${eve.title}</div>
                                        </div>
                                    </li>
                                    <li class="yui3-u-1-8">
                                        <span>颜色: 银色</span>
                                        <br>
                                        <span>处理器: Core I5</span>
                                        <br>
                                        <span>内存: 8GB</span>
                                        <br>
                                        <span>尺寸: 13.3英寸</span>
                                        <br>
                                    </li>
                                    <li class="yui3-u-1-8">
                                        <span class="price">${eve.price}</span>
                                    </li>
                                    <li class="yui3-u-1-8">
                                        <div class="clearfix">
                                            <a href="javascript:;" class="increment mins">-</a>
                                            <input autocomplete="off" type="text" value="${eve.cart_number}" minnum="1" class="itxt">
                                            <a href="javascript:;" class="increment plus">+</a>
                                        </div>
                                        <div class="youhuo">有货</div>
                                    </li>
                                    <li class="yui3-u-1-8">
                                        <span class="sum"></span>
                                    </li>
                                    <li class="yui3-u-1-8">
                                        <div class="del1">
                                            <a href="javascript:;"class="del1">删除</a>
                                        </div>
                                        <div>移到我的关注</div>
                                    </li>
                                </ul>
         `
        })
        this.$(".cart-list").innerHTML = html
    }


    // 设置加减效果
    // 封装一个获取节点的方法
    $(ele) {
        return document.querySelector(ele) || document.querySelectorAll(ele)
    }

}
new Fn