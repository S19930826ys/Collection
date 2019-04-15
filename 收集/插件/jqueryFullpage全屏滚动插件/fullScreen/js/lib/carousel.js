// 插件弢��?,朢�前面加一个分号，目的是防止前面加载进来的js文件朢�后没有分号闭�?
;(function($){
    // 定义丢�个函�?
    var Carousel = function($obj){
        var self = this;
        // 保存当前对象
        this.carousel = $obj;
        this.carousel_list = $obj.find("ul");
        this.nextBtn = $obj.find("div.poster-next-btn");
        this.prevBtn = $obj.find("div.poster-prev-btn");
        this.items = this.carousel_list.find("li");
        this.firstItem = this.items.first();
        this.lastItem = this.items.last();
        this.rotateFlag = true;
        // 默认配置参数
        this.setting = {
            "width":1000,   // 幻灯片的宽度
            "height":270,   // 幻灯片的高度
            "viewWidth":640,    // 幻灯片第丢�帧的宽度
            "viewHeight":270,   // 幻灯片第丢�帧的高度
            "scale":0.9,    // 记录显示比例关系
            "speed":500,
            "autoPlay":true,
            "delay":2000,
            "verticalAlign":"middle"
        };
        $.extend(this.setting,this.getSetting());// 扩展默认配置参数,将人为设置的参数替换默认参数
        // 设置对象参数
        this.setSettingValue();
        this.setFramePos();
        // 是否�?启自动播�?
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
    // 原型链封装插�?
    Carousel.prototype = {
        // 自动播放函数
        autoPlay:function(){
            var self = this;
            this.timer = window.setInterval(function(){
                self.nextBtn.click();
            },self.setting.delay);
        },
        // 单击上下按钮旋转图片
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
        // 设置剩余帧的位置关系
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
            // 设置右边帧的位置关系和高度Top
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

            // 设置左边帧的位置关系和高度Top
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
        // 设置垂直排列对齐
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
        // 设置配置参数
        setSettingValue:function(){
            // 设置幻灯片的样式
            this.carousel.css({
                width:this.setting.width,
                height:this.setting.height
            });
            // 设置ul样式
            this.carousel_list.css({
                width:this.setting.width,
                height:this.setting.height
            });
            // 设置左右按钮样式
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
            // 设置第一帧位�?
            this.firstItem.css({
                left:btn_w,
                "z-index":Math.floor(this.items.size()/2),
                width:this.setting.viewWidth,
                height:this.setting.viewHeight
            });
        },
        // 获取人工配置参数
        getSetting:function(){
            var setting = this.carousel.attr("data-setting");
            if(setting&&setting!=""){
                return $.parseJSON(setting);
            }else{
                return {};
            }

        }
    };
    // 初始化传递参数的集合 $obj为一个集�?
    Carousel.init = function($objs){
        var _this = this;// _this为Carousel对象
        $objs.each(function(){
            new _this($(this));// 为每�?个对象new�?个Carousel实例
        })
    };
    // 闭包，所以需要全�?注册才能访问
    window["Carousel"] = Carousel;
})(jQuery);/**
 * Created by admin on 2017/9/21.
 */
