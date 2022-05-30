class List {
    // 构造方法
    constructor() {
            // 给登录按钮设置点击事件
            this.$('.btn11').addEventListener('click', this.Login)
                // console.log();
                // 判断是否有回调页面
            let search = location.search
            if (search) {
                this.url = search.split('=')[1]
            }
        }
        // 登录的实现
    Login = () => {
            // 获取form表单
            let form = document.forms[0]
            let username = form[0].value.trim()
            let password = form[1].value.trim()
                // 进行非空验证
            if (username == '' || password == '') throw new Error('不能为空')
            let param = `username=${username}&password=${password}`;
            axios.post('http://localhost:8888/users/login', param, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                if (res.status == 200 && res.data.code == 1) {
                    // 将token和user保存到local
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user_id', res.data.user.id);
                    // 如果有回跳的地址则跳转
                    if (this.url) {
                        location.href = this.url
                    }
                }
            })

        }
        // 封装一个获取元素的方法
    $(ele) {
        return document.querySelector(ele) || document.querySelectorAll(ele)
    }
}
new List