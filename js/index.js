const PAGE={
    data:{
        UPLOAD_API:'https://www.jevescript.com/api/task/mobile',
        message:null
    },
    init:function(){
        this.bind();
    },
    bind:function(){
        window.addEventListener('pageshow',this.size);
        window.addEventListener('resize',this.size);
        let phoneBtn= document.getElementById('s1-go');
        phoneBtn.addEventListener('click',this.phone);
    },
    size:function(){
        let docElement = document.documentElement;
        let width = docElement.getBoundingClientRect().width;
        let rem = width/10;
        docElement.style.fontSize=rem+'px';
    },
    phone:function(){
        let phoneNum = document.getElementById('s1-input').value;
        $.ajax({
            type: "POST",
            url: PAGE.data.UPLOAD_API,
            data: {
                phone: phoneNum,
            },
            success: (res) => {
                console.log(res)
                PAGE.data.message=res.message;
                PAGE.tips();
            },
            error: (err) =>{
                console.log(err)
            }
        });
    },
    tips:function(){
        let message = PAGE.data.message;
        switch (message){
            case '手机号不能为空':
                $("#s1-tips").text('手机号不能为空');
                $("#s1-tips").css('display','block')
                $("#s1-input").attr('class','s1-input active');
                break;
            case '手机格式错误' :
                $("#s1-tips").text('手机格式错误');
                $("#s1-tips").css('display','block')
                $("#s1-input").attr('class','s1-input active');
                break;
            case '提交成功' :
                $("#s1-tips").css('display','none')
                $("#s1-input").attr('class','s1-input');
        }
    }
}
PAGE.init();