/**
 * Created by admin on 2017/9/21.
 */
// 采用seajs定义模块
define(function(require,exports,module){
    "use strict";
    var $ = require("./jquery");
    require('./lib/jquery.fullpage.min');
    require("./lib/move");
    var Module = {
        // 初始�?
        init:function(){
            var _self = this;
            // 当前是第几个屏幕
            _self.currentIndex = 0;
            // 动画持续时间（导航条消失，显示的持续时间�?
            _self.animateDuration = 600;
            // 启动fullpage插件
            _self.startFullPage();
            // 处理事件
            _self.eventHandler();
        },
        startFullPage:function(){
            var _self = this;
            $('#page-wrapper').fullpage({
                // 为每丢�个section定义锚链�?,可以增加定位到第几屏,不要与页面中的id相同
                //anchors: ["banner","communitySolution","familySolution","serverPlatform","cooperativePartner","footer"],
                // 是否垂直居中
                verticalCentered: false,
                // 是否允许左右幻灯片效�?
                slidesNavigation: true,
                // 导航小圆点的位置
                //slidesNavPosition:"bottom",
                // 是否显示左右箭头
                controlArrows:false,
                // 是否显示垂直导航小圆�?
                navigation:true,
                // 设置导航小圆点的位置
                navigationPosition:"right",
                // 设置导航小圆点的提示，当鼠标滑到小圆点处获得提示信息
                //navigationTooltips:["1","2","3","4","5","6"],
                // 设置是否直接显示提示信息
                //showActiveTooltip:true,
                // 为页面中的section设置背景颜色
                //sectionsColor : ['#fff', '#fff', '#ffcdb1', '#f8f8f8', '#53d1d2', '#fff'],
                // 设置页面固定元素
                //fixedElements:"#topbar",
                // 设置section的内边距
                //paddingTop:"82px",
                //paddingBottom:"82px",
                // 是否显示浏览器自带的滚动�?
                scrollBar:_self.isMobile()?true:false,
                // 是否使用插件的滚动方�?,false为使用浏览器自带的滚动方�?
                autoScrolling:_self.isMobile()?false:true,
                // 每个section切换的滚动��度
                //scrollingSpeed:700,
                // 设置字体是否随着窗口的缩放��缩�?
                //resize:false,
                // 当section滚动到最顶部的时候是否连续滚动到底部
                //loopTop:false,
                // 当section滚动到最顶部的时候是否连续滚动到底部
                //loopBottom:false,
                // 是否循环滚动水平轮播�?
                //loopHorizontal:true,
                // 是否设置页面滚动连续循环
                //continuousVertical:false,
                // 记录操作历史，点击浏览器的后逢�按钮可以返回上一步操�?
                //recordHistory:true,
                // 内容超过框的大小是否显示滚动条，霢�要插件slimScroll配合
                //scrollOverflow:true,

                /**
                 * 页面结构生成后的回调函数
                 */
                afterRender:function(){
                    if($("body").hasClass("index")){
                        setNavPosition();
                    }
                },
                /**
                 * 页面大小发生改变
                 */
                afterResize: function () {
                    if($("body").hasClass("index")){
                        setNavPosition();
                    }
                },
                /**
                 * 每一个section进入后执�?
                 * @param mao 锚链接的名称
                 * @param index 当前section序号�?1弢��?
                 */
                afterLoad: function (mao, index) {
                    _self.currentIndex = index;
                },
                /**
                 * 每一个section离开后执�?
                 * @param index 离开的section序号
                 * @param nextIndex 目标的section序号
                 * @param updown 滚动的方向是下还是上
                 */
                onLeave: function (index, nextIndex, updown) {
                    _self.currentIndex = nextIndex;
                    // 当页面向下滚动时，隐藏导�?
                    if (updown == 'down') {
                        move(".wrapper").set("height",0).duration(1000).end();
                        move(".wrapper .container").set("height",0).duration(1000).end();
                    }else if(updown == "up" && nextIndex == 1){
                        move(".wrapper").set("height","100px").duration(1000).end();
                        move(".wrapper .container").set("height","100px").duration(1000).end();
                    }
                }
            });
            setInterval(function(){
                $.fn.fullpage.moveSlideRight();
            },4000)
        },
        eventHandler:function(){
            var _self = this;
            // banner切换事件
            $(".slide-image").click(function(){
                window.location.href = $(this).attr("data-href");
            });
            // 后台登录切换事件
            $(".header-search-wrapper").hover(function(){
                $(".container-header").css("overflow","visible");
                move(".signin-sub").set("height","125px").duration(_self.animateDuration).end();
            },function(){
                $(".container-header").css("overflow","hidden");
                move(".signin-sub").set("height","0").duration(_self.animateDuration).end();
            });
            // 导航条切换事�?
            $(".header").hover(function(){
                // 当前页面不为第一页的时��才有hover事件
                if(_self.currentIndex==0){
                    var scrollTop = $(document).scrollTop();
                    move(".wrapper .container").set("height","100px").duration(_self.animateDuration).end();
                    move(".wrapper").set("height","100px").duration(_self.animateDuration).end();
                }else if(_self.currentIndex!=1){
                    move(".wrapper .container").set("height","100px").duration(_self.animateDuration).end();
                    move(".wrapper").set("height","100px").duration(_self.animateDuration).end();
                }

            },function(){
                if(_self.currentIndex==0){
                    var scrollTop = $(document).scrollTop();
                    if(scrollTop>101){
                        move(".wrapper").set("height",0).duration(_self.animateDuration).end();
                        move(".wrapper .container").set("height",0).duration(_self.animateDuration).end();
                    }
                }else if(_self.currentIndex!=1){
                    move(".wrapper").set("height",0).duration(_self.animateDuration).end();
                    move(".wrapper .container").set("height",0).duration(_self.animateDuration).end();
                }
            });
            $(document).scroll(function(){
                var scrollTop = $(document).scrollTop();
                if(scrollTop>101){
                    move(".wrapper").set("height",0).duration(1000).end();
                    move(".wrapper .container").set("height",0).duration(1000).end();
                }else{
                    move(".wrapper").set("height","100px").duration(1000).end();
                    move(".wrapper .container").set("height","100px").duration(1000).end();
                }


            })
            // 绑定导航条点击切换样式事�?
            $(".header-nav").on("click",".list-item",function(){
                $(this).addClass("current");
                $(this).siblings().removeClass("current");
            });
            /*// 点击客服图标切换内容事件
             $("#service-online").on("click",function(){
             move(this).set("right","-56px").duration(_self.animateDuration).end();
             move("#service-detail-wrapper").set("right",0).duration(_self.animateDuration).end();
             });
             // 客服QQ获得，以及失去事�?
             $("#service-detail-wrapper").hover(function(){
             move(this).set("right","-56px").duration(_self.animateDuration).end();
             move("#service-detail-wrapper").set("right",0).duration(_self.animateDuration).end();
             },function(){
             move("#service-online").set("right",0).duration(_self.animateDuration).end();
             move(this).set("right","-121px").duration(_self.animateDuration).end();
             });
             // 绑定平台与服务页面，产品服务鼠标移动上去效果
             $("#link-product-server").hover(function(){
             move("#service-detail").set("height","140px").duration(_self.animateDuration).end();
             });
             $("#service-detail").hover(function(){
             },function(){
             move("#service-detail").set("height",0).duration(_self.animateDuration).end();
             });*/
            $(".close_icon").click(function(){
                $(".service-pop").hide();
                $("#serviceForm")[0].reset();
                $("#service-btn-submit").text("提交").removeAttr("disabled");
            })
            //点击弹窗
            $("#service-online").on("click", function () {
                $(".service-pop").toggle();
            })
            //提交霢��?
            $("#service-btn-submit").click(function(){
                var flag = true;
                $("#service-name,#service-phone,#service-company").each(function(){
                    var val = $.trim($(this).val());
                    if(val==""){
                        $(this).css("border","1px solid red");
                        $(this).focus();
                        flag = false;
                        return false;
                    }else{
                        $(this).css("border","0");
                    }
                })
                if(flag){
                    if(!(/^1[34578]\d{9}$/.test($("#service-phone").val()))){
                        $("#service-phone").next(".err-tip").show();
                        flag = false;
                        $("#service-phone").focus();
                    }else{
                        $("#service-phone").next(".err-tip").hide();
                    }
                }
                if(flag){
                    var data = $("#serviceForm").serializeArray();
                    data.push({"name":"system","value":"0"});
                    data.push({"name":"ver","value":""});
                    data.push({"name":"remark","value":""});
                    data.push({"name":"spend","value":""});
                    data.push({"name":"funclist","value":""});
                    //console.log(data)
                    $.ajax({
                        url:location.protocol + "//" + location.host + "/index.php/submitRequire",
                        method:"post",
                        data:data,
                        beforeSend:function(){
                            $("#service-btn-submit").text("提交�?...").attr("disabled","disabled");
                        },
                        success:function (data) {
                            data = JSON.parse(data);
                            if(data.status=="200"){
                                $("#service-btn-submit").text("已提�?");
                            }
                        }
                    })
                }
            })
        },
        isMobile:function(){
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                return true;
            } else {
                return false;
            }
        }
    };
    //重置section1 和section8 导航栏位�?
    function setNavPosition(){
        //修改session1 导航位置
        var height = $(".section").height()+10;
        $(".section1 .fp-slidesNav ").css({"bottom":0.5*height+"px"});
        //修改session8 导航位置
        var slideDiv = $(".section8 .right");
        var x = slideDiv.offset().left;
        var y = slideDiv.position().top;
        var slideWidth = slideDiv.width();
        var slideHeight = slideDiv.height();
        var navWidth = $(".fp-slidesNav .bottom").width();
        $(".section8 .fp-slidesNav ").css({"bottom":0.5*($(".section8").height()-slideDiv.height())-20+"px","left":x+0.5*(slideWidth-navWidth)+"px"});
    }
    //格式化成json
    function formatToJson(data){
        var newData = {};
        for(var i=0;i<data.length;i++){
            if($.trim(data[i].value)!="")
                newData[data[i].name] = data[i].value;
        }
        return newData;
    }
    module.exports = Module;
});