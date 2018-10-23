// 鎻掍欢寮€鍙?,鏈€鍓嶉潰鍔犱竴涓垎鍙凤紝鐩殑鏄槻姝㈠墠闈㈠姞杞借繘鏉ョ殑js鏂囦欢鏈€鍚庢病鏈夊垎鍙烽棴鍚?
;(function($){
    // 瀹氫箟涓€涓嚱鏁?
    var Carousel = function($obj){
        var self = this;
        // 淇濆瓨褰撳墠瀵硅薄
        this.carousel = $obj;
        this.carousel_list = $obj.find("ul");
        this.nextBtn = $obj.find("div.poster-next-btn");
        this.prevBtn = $obj.find("div.poster-prev-btn");
        this.items = this.carousel_list.find("li");
        this.firstItem = this.items.first();
        this.lastItem = this.items.last();
        this.rotateFlag = true;
        // 榛樿閰嶇疆鍙傛暟
        this.setting = {
            "width":1000,   // 骞荤伅鐗囩殑瀹藉害
            "height":270,   // 骞荤伅鐗囩殑楂樺害
            "viewWidth":640,    // 骞荤伅鐗囩涓€甯х殑瀹藉害
            "viewHeight":270,   // 骞荤伅鐗囩涓€甯х殑楂樺害
            "scale":0.9,    // 璁板綍鏄剧ず姣斾緥鍏崇郴
            "speed":500,
            "autoPlay":true,
            "delay":2000,
            "verticalAlign":"middle"
        };
        $.extend(this.setting,this.getSetting());// 鎵╁睍榛樿閰嶇疆鍙傛暟,灏嗕汉涓鸿缃殑鍙傛暟鏇挎崲榛樿鍙傛暟
        // 璁剧疆瀵硅薄鍙傛暟
        this.setSettingValue();
        this.setFramePos();
        // 鏄惁寮?鍚嚜鍔ㄦ挱鏀?
        if(this.setting.autoPlay){
            this.autoPlay();
            this.carousel.hover(function(){
                window.clearInterval(self.timer);
            },function(){
                self.autoPlay();
            });
        }

        this.nextBtn.click(function(){
            if(self.rotateFlag){
                self.rotateFlag = false;
                self.carouselRotate("left");
            }

        });
        this.prevBtn.click(function(){
            if(self.rotateFlag){
                self.rotateFlag = false;
                self.carouselRotate("right");
            }
        });
    };
    // 鍘熷瀷閾惧皝瑁呮彃浠?
    Carousel.prototype = {
        // 鑷姩鎾斁鍑芥暟
        autoPlay:function(){
            var self = this;
            this.timer = window.setInterval(function(){
                self.nextBtn.click();
            },self.setting.delay);
        },
        // 鍗曞嚮涓婁笅鎸夐挳鏃嬭浆鍥剧墖
        carouselRotate:function(dir){
            var _this = this;
            var zIndexArr = [];
            var zProjectDisplayArr = [];
            if(dir==="left"){
                this.items.each(function(i){
                    var self = $(this),
                        prev = self.prev().get(0)?self.prev():_this.lastItem,
                        prevProject = self.prev().get(0)?self.prev().find(".project-describe"):_this.lastItem.find(".project-describe"),
                        width = prev.width(),
                        height = prev.height(),
                        zDisplay = prevProject.hasClass("hidden") ? "hidden":"show",
                        zIndex = prev.css("z-index"),
                        opacity = prev.css("opacity"),
                        left = prev.css("left"),
                        top = prev.css("top");
                    zIndexArr.push(zIndex);
                    zProjectDisplayArr.push(zDisplay);
                    self.animate({
                        width:width,
                        height:height,
                        opacity : opacity,
                        left :left,
                        top:top
                    },_this.speed,function() {
                        _this.rotateFlag=true;
                    });
                });
                _this.items.each(function(i){
                    $(this).find(".project-describe").removeClass("hidden").addClass(zProjectDisplayArr[i]);
                    $(this).css("z-index",zIndexArr[i]);
                });
            }else if(dir === "right"){
                this.items.each(function(i){
                    var self = $(this),
                        next = self.next().get(0)?self.next():_this.firstItem,
                        nextProject = self.next().get(0)?self.next().find(".project-describe"):_this.firstItem.find(".project-describe"),
                        width = next.width(),
                        height = next.height(),
                        zIndex = next.css("z-index"),
                        zDisplay = nextProject.hasClass("hidden") ? "hidden":"show",
                        opacity = next.css("opacity"),
                        left = next.css("left"),
                        top = next.css("top");
                    zIndexArr.push(zIndex);
                    zProjectDisplayArr.push(zDisplay);
                    self.animate({
                        width:width,
                        height:height,
                        opacity : opacity,
                        left :left,
                        top:top
                    },_this.speed,function(){
                        _this.rotateFlag=true;
                    });

                });
                _this.items.each(function(i){
                    $(this).find(".project-describe").removeClass("hidden").addClass(zProjectDisplayArr[i]);
                    $(this).css("z-index",zIndexArr[i]);
                });
            }
        },
        // 璁剧疆鍓╀綑甯х殑浣嶇疆鍏崇郴
        setFramePos:function(){
            var self = this;
            var sliceItems = this.items.slice(1);
            var sliceSize = sliceItems.size()/2;
            var rightSlice =sliceItems.slice(0,sliceSize);
            var level = Math.floor(this.items.size()/2);
            var leftSlice =sliceItems.slice(sliceSize);

            var rw = this.setting.viewWidth,
                rh = this.setting.viewHeight,
                gap = ((this.setting.width-this.setting.viewWidth)/2)/level;
            var firstLeft = (self.setting.width-self.setting.viewWidth)/2;
            var fixOffsetLeft = firstLeft+rw;
            // 璁剧疆鍙宠竟甯х殑浣嶇疆鍏崇郴鍜岄珮搴op
            rightSlice.each(function(i){
                level--;
                rw=rw*self.setting.scale;
                rh=rh*self.setting.scale;

                var j = i;
                $(this).css({
                    "z-index":level,
                    width:rw,
                    height:rh,
                    opacity:1/(++i),
                    left:fixOffsetLeft+(++j)*gap-rw,
                    top:self.setVeticalAlign(rh)
                }) ;
            });
            var lw = rightSlice.last().width(),
                lh =rightSlice.last().height(),
                oloop =Math.floor(this.items.size()/2);

            // 璁剧疆宸﹁竟甯х殑浣嶇疆鍏崇郴鍜岄珮搴op
            leftSlice.each(function(i){
                var j = i;
                $(this).css({
                    "z-index":i++,
                    width:lw,
                    height:lh,
                    opacity:1/oloop--,
                    left:j*gap,
                    top:self.setVeticalAlign(lh)
                }) ;
                lw = lw/self.setting.scale;
                lh = lh/self.setting.scale;
            });
        },
        // 璁剧疆鍨傜洿鎺掑垪瀵归綈
        setVeticalAlign:function(height){
            var verticalAlign = this.setting.verticalAlign;
            var top = 0;
            if(verticalAlign === "middle"){
                top = (this.setting.height-this.setting.viewHeight-height)/2;
            }else if(verticalAlign === "top"){
                top = 0;
            }else if(verticalAlign === "bottom"){
                top = this.setting.height-this.setting.viewHeight-height;
            }else{
                top = (this.setting.height-this.setting.viewHeight-height)/2;
            }
            return top;
        },
        // 璁剧疆閰嶇疆鍙傛暟
        setSettingValue:function(){
            // 璁剧疆骞荤伅鐗囩殑鏍峰紡
            this.carousel.css({
                width:this.setting.width,
                height:this.setting.height
            });
            // 璁剧疆ul鏍峰紡
            this.carousel_list.css({
                width:this.setting.width,
                height:this.setting.height
            });
            // 璁剧疆宸﹀彸鎸夐挳鏍峰紡
            var btn_w = (this.setting.width-this.setting.viewWidth)/2;
            this.nextBtn.css({
                width:btn_w,
                height:this.setting.height-this.setting.viewHeight,
                "z-index":Math.ceil(this.items.size()/2)
            });
            this.prevBtn.css({
                width:btn_w,
                height:this.setting.height-this.setting.viewHeight,
                "z-index":Math.ceil(this.items.size()/2)
            });
            // 璁剧疆绗竴甯т綅缃?
            this.firstItem.css({
                left:btn_w,
                "z-index":Math.floor(this.items.size()/2),
                width:this.setting.viewWidth,
                height:this.setting.viewHeight
            });
        },
        // 鑾峰彇浜哄伐閰嶇疆鍙傛暟
        getSetting:function(){
            var setting = this.carousel.attr("data-setting");
            if(setting&&setting!=""){
                return $.parseJSON(setting);
            }else{
                return {};
            }

        }
    };
    // 鍒濆鍖栦紶閫掑弬鏁扮殑闆嗗悎 $obj涓轰竴涓泦鍚?
    Carousel.init = function($objs){
        var _this = this;// _this涓篊arousel瀵硅薄
        $objs.each(function(){
            new _this($(this));// 涓烘瘡涓?涓璞ew涓?涓狢arousel瀹炰緥
        })
    };
    // 闂寘锛屾墍浠ラ渶瑕佸叏灞?娉ㄥ唽鎵嶈兘璁块棶
    window["Carousel"] = Carousel;
})(jQuery);/**
 * Created by admin on 2017/9/21.
 */
