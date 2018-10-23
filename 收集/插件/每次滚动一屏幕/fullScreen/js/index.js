/**
 * Created by admin on 2017/9/21.
 */
// 閲囩敤seajs瀹氫箟妯″潡
define(function(require,exports,module){
    "use strict";
    var $ = require("./jquery");
    require('./lib/jquery.fullpage.min');
    require("./lib/move");
    var Module = {
        // 鍒濆鍖?
        init:function(){
            var _self = this;
            // 褰撳墠鏄鍑犱釜灞忓箷
            _self.currentIndex = 0;
            // 鍔ㄧ敾鎸佺画鏃堕棿锛堝鑸潯娑堝け锛屾樉绀虹殑鎸佺画鏃堕棿锛?
            _self.animateDuration = 600;
            // 鍚姩fullpage鎻掍欢
            _self.startFullPage();
            // 澶勭悊浜嬩欢
            _self.eventHandler();
        },
        startFullPage:function(){
            var _self = this;
            $('#page-wrapper').fullpage({
                // 涓烘瘡涓€涓猻ection瀹氫箟閿氶摼鎺?,鍙互澧炲姞瀹氫綅鍒扮鍑犲睆,涓嶈涓庨〉闈腑鐨刬d鐩稿悓
                //anchors: ["banner","communitySolution","familySolution","serverPlatform","cooperativePartner","footer"],
                // 鏄惁鍨傜洿灞呬腑
                verticalCentered: false,
                // 鏄惁鍏佽宸﹀彸骞荤伅鐗囨晥鏋?
                slidesNavigation: true,
                // 瀵艰埅灏忓渾鐐圭殑浣嶇疆
                //slidesNavPosition:"bottom",
                // 鏄惁鏄剧ず宸﹀彸绠ご
                controlArrows:false,
                // 鏄惁鏄剧ず鍨傜洿瀵艰埅灏忓渾鐐?
                navigation:true,
                // 璁剧疆瀵艰埅灏忓渾鐐圭殑浣嶇疆
                navigationPosition:"right",
                // 璁剧疆瀵艰埅灏忓渾鐐圭殑鎻愮ず锛屽綋榧犳爣婊戝埌灏忓渾鐐瑰鑾峰緱鎻愮ず淇℃伅
                //navigationTooltips:["1","2","3","4","5","6"],
                // 璁剧疆鏄惁鐩存帴鏄剧ず鎻愮ず淇℃伅
                //showActiveTooltip:true,
                // 涓洪〉闈腑鐨剆ection璁剧疆鑳屾櫙棰滆壊
                //sectionsColor : ['#fff', '#fff', '#ffcdb1', '#f8f8f8', '#53d1d2', '#fff'],
                // 璁剧疆椤甸潰鍥哄畾鍏冪礌
                //fixedElements:"#topbar",
                // 璁剧疆section鐨勫唴杈硅窛
                //paddingTop:"82px",
                //paddingBottom:"82px",
                // 鏄惁鏄剧ず娴忚鍣ㄨ嚜甯︾殑婊氬姩鏉?
                scrollBar:_self.isMobile()?true:false,
                // 鏄惁浣跨敤鎻掍欢鐨勬粴鍔ㄦ柟寮?,false涓轰娇鐢ㄦ祻瑙堝櫒鑷甫鐨勬粴鍔ㄦ柟寮?
                autoScrolling:_self.isMobile()?false:true,
                // 姣忎釜section鍒囨崲鐨勬粴鍔ㄩ€熷害
                //scrollingSpeed:700,
                // 璁剧疆瀛椾綋鏄惁闅忕潃绐楀彛鐨勭缉鏀捐€岀缉鏀?
                //resize:false,
                // 褰搒ection婊氬姩鍒版渶椤堕儴鐨勬椂鍊欐槸鍚﹁繛缁粴鍔ㄥ埌搴曢儴
                //loopTop:false,
                // 褰搒ection婊氬姩鍒版渶椤堕儴鐨勬椂鍊欐槸鍚﹁繛缁粴鍔ㄥ埌搴曢儴
                //loopBottom:false,
                // 鏄惁寰幆婊氬姩姘村钩杞挱鍥?
                //loopHorizontal:true,
                // 鏄惁璁剧疆椤甸潰婊氬姩杩炵画寰幆
                //continuousVertical:false,
                // 璁板綍鎿嶄綔鍘嗗彶锛岀偣鍑绘祻瑙堝櫒鐨勫悗閫€鎸夐挳鍙互杩斿洖涓婁竴姝ユ搷浣?
                //recordHistory:true,
                // 鍐呭瓒呰繃妗嗙殑澶у皬鏄惁鏄剧ず婊氬姩鏉★紝闇€瑕佹彃浠秙limScroll閰嶅悎
                //scrollOverflow:true,

                /**
                 * 椤甸潰缁撴瀯鐢熸垚鍚庣殑鍥炶皟鍑芥暟
                 */
                afterRender:function(){
                    if($("body").hasClass("index")){
                        setNavPosition();
                    }
                },
                /**
                 * 椤甸潰澶у皬鍙戠敓鏀瑰彉
                 */
                afterResize: function () {
                    if($("body").hasClass("index")){
                        setNavPosition();
                    }
                },
                /**
                 * 姣忎竴涓猻ection杩涘叆鍚庢墽琛?
                 * @param mao 閿氶摼鎺ョ殑鍚嶇О
                 * @param index 褰撳墠section搴忓彿浠?1寮€濮?
                 */
                afterLoad: function (mao, index) {
                    _self.currentIndex = index;
                },
                /**
                 * 姣忎竴涓猻ection绂诲紑鍚庢墽琛?
                 * @param index 绂诲紑鐨剆ection搴忓彿
                 * @param nextIndex 鐩爣鐨剆ection搴忓彿
                 * @param updown 婊氬姩鐨勬柟鍚戞槸涓嬭繕鏄笂
                 */
                /*onLeave: function (index, nextIndex, updown) {
                    _self.currentIndex = nextIndex;
                    //孙于舜
                    if (updown == 'down') {
                        move(".wrapper").set("height",0).duration(1000).end();
                        move(".wrapper .container").set("height",0).duration(1000).end();
                    }else if(updown == "up" && nextIndex == 1){
                        move(".wrapper").set("height","100px").duration(1000).end();
                        move(".wrapper .container").set("height","100px").duration(1000).end();
                    }
                }*/
            });
            setInterval(function(){
                $.fn.fullpage.moveSlideRight();
            },4000)
        },
        eventHandler:function(){
            var _self = this;
            // banner鍒囨崲浜嬩欢
            $(".slide-image").click(function(){
                window.location.href = $(this).attr("data-href");
            });
            // 鍚庡彴鐧诲綍鍒囨崲浜嬩欢
            $(".header-search-wrapper").hover(function(){
                $(".container-header").css("overflow","visible");
                move(".signin-sub").set("height","125px").duration(_self.animateDuration).end();
            },function(){
                $(".container-header").css("overflow","hidden");
                move(".signin-sub").set("height","0").duration(_self.animateDuration).end();
            });
            // 孙于舜
            /*$(".header").hover(function(){
                // 褰撳墠椤甸潰涓嶄负绗竴椤电殑鏃跺€欐墠鏈塰over浜嬩欢
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
            });*/
            //孙于舜
            /*$(document).scroll(function(){
                var scrollTop = $(document).scrollTop();
                if(scrollTop>101){
                    move(".wrapper").set("height",0).duration(1000).end();
                    move(".wrapper .container").set("height",0).duration(1000).end();
                }else{
                    move(".wrapper").set("height","100px").duration(1000).end();
                    move(".wrapper .container").set("height","100px").duration(1000).end();
                }


            })*/
            // 缁戝畾瀵艰埅鏉＄偣鍑诲垏鎹㈡牱寮忎簨浠?
            $(".header-nav").on("click",".list-item",function(){
                $(this).addClass("current");
                $(this).siblings().removeClass("current");
            });
            /*// 鐐瑰嚮瀹㈡湇鍥炬爣鍒囨崲鍐呭浜嬩欢
             $("#service-online").on("click",function(){
             move(this).set("right","-56px").duration(_self.animateDuration).end();
             move("#service-detail-wrapper").set("right",0).duration(_self.animateDuration).end();
             });
             // 瀹㈡湇QQ鑾峰緱锛屼互鍙婂け鍘讳簨浠?
             $("#service-detail-wrapper").hover(function(){
             move(this).set("right","-56px").duration(_self.animateDuration).end();
             move("#service-detail-wrapper").set("right",0).duration(_self.animateDuration).end();
             },function(){
             move("#service-online").set("right",0).duration(_self.animateDuration).end();
             move(this).set("right","-121px").duration(_self.animateDuration).end();
             });
             // 缁戝畾骞冲彴涓庢湇鍔￠〉闈紝浜у搧鏈嶅姟榧犳爣绉诲姩涓婂幓鏁堟灉
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
                $("#service-btn-submit").text("鎻愪氦").removeAttr("disabled");
            })
            //鐐瑰嚮寮圭獥
            $("#service-online").on("click", function () {
                $(".service-pop").toggle();
            })
            //鎻愪氦闇€姹?
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
                            $("#service-btn-submit").text("鎻愪氦涓?...").attr("disabled","disabled");
                        },
                        success:function (data) {
                            data = JSON.parse(data);
                            if(data.status=="200"){
                                $("#service-btn-submit").text("宸叉彁浜?");
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
    //閲嶇疆section1 鍜宻ection8 瀵艰埅鏍忎綅缃?
    function setNavPosition(){
        //淇敼session1 瀵艰埅浣嶇疆
        var height = $(".section").height()+10;
        $(".section1 .fp-slidesNav ").css({"bottom":0.5*height+"px"});
        //淇敼session8 瀵艰埅浣嶇疆
        var slideDiv = $(".section8 .right");
        var x = slideDiv.offset().left;
        var y = slideDiv.position().top;
        var slideWidth = slideDiv.width();
        var slideHeight = slideDiv.height();
        var navWidth = $(".fp-slidesNav .bottom").width();
        $(".section8 .fp-slidesNav ").css({"bottom":0.5*($(".section8").height()-slideDiv.height())-20+"px","left":x+0.5*(slideWidth-navWidth)+"px"});
    }
    //鏍煎紡鍖栨垚json
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