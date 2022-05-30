class Fun {

    // 构造方法
    constructor() {

            this.addCart()
        }
        // 获取商品列表
    addCart = () => {
        let sp = localStorage.getItem("sp")
        axios.get('http://localhost:8888/goods/item', {
            params: {
                id: sp
            }
        }).then((res) => {

            // res.data.info
            let html = `
            <div class="preview_wrap fl">
            <div class="">
                <img src="${res.data.info.img_big_logo}" alt="">
                <div class="mask"></div>
                <div class="big">
                    <img src="../image/背景图.png" width="800px" alt="" class="bigimg">
                </div>
            </div>
            <div class="preview_list">
                <a href="javascript:;" class="arrow_prev">
                </a>
                <a href="javascript:;" class="arrow_next">></a>
                <ul class="list_item">
                    <li class="current"><img src="../uploads/b1.jpg" alt="" width="56px"></li>
                    <li><img src="../uploads/b2.jpg" alt="" width="56px"></li>
                    <li><img src="../uploads/b3.jpg" alt="" width="56px"></li>
                    <li><img src="../uploads/b4.jpg" alt="" width="56px"></li>
                    <li><img src="../uploads/b5.jpg" alt="" width="56px"></li>
                </ul>
            </div>
        </div>
          `
            this.$('.product_intro').innerHTML = html
        })
    }
    $(ele) {
        return document.querySelector(ele) || document.querySelectorAll(ele)
    }
}
new Fun