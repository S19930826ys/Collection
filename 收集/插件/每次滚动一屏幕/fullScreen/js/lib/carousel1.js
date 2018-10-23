/**
 * Created by admin on 2017/9/21.
 */
/*
 *锟街诧拷锟斤拷锟?
 * 锟斤拷锟竭ｏ拷锟斤拷锟斤拷
 * 锟斤拷锟节ｏ拷2015-12-29
 * 锟斤拷锟杰ｏ拷
 * 1锟斤拷锟斤拷锟斤拷锟叫伙拷锟斤拷钮锟街诧拷图片
 * 2锟斤拷锟铰凤拷小圆锟斤拷锟叫伙拷图片
 * 3锟斤拷锟皆讹拷锟街诧拷图片
 * 注锟解：
 * 1锟斤拷图片锟斤拷锟斤拷锟斤拷锟解长锟饺达拷小锟斤拷一锟斤拷图片锟斤拷锟斤拷锟斤拷锟斤拷玫锟斤拷锟斤拷锟斤拷吖锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟酵计帮拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷要一锟斤拷
 * 2锟斤拷锟斤拷锟矫诧拷锟斤拷锟叫碉拷图片锟竭讹拷锟斤拷锟斤拷要锟斤拷实锟绞高度匡拷锟揭伙拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟绞?
 * 3锟斤拷小圆锟斤拷锟斤拷锟斤拷锟酵计拷锟斤拷锟揭伙拷锟?
 * 4锟斤拷默锟斤拷锟皆讹拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟酵Ｖ癸拷锟斤拷锟斤拷锟斤拷瞥锟斤拷锟斤拷远锟斤拷锟斤拷锟斤拷指锟?
 */
;(function($){
    /*
     * $carouselObj 锟斤拷示锟斤拷锟斤拷锟斤拷锟絡Query锟斤拷锟斤拷
     */
    var Carousel = function($carouselObj){
        var self = this;
        // 锟斤拷锟芥当前锟街诧拷锟斤拷锟斤拷
        self.carousel = $carouselObj;
        // ul锟斤拷锟斤拷
        self.carouselList = $carouselObj.find(".carousel-list");
        // 锟斤拷锟斤拷li锟斤拷锟斤拷
        self.carouselListItems = self.carouselList.find(".list-item");
        // 锟斤拷锟斤拷锟叫伙拷锟斤拷钮
        self.prevBtn = $carouselObj.find(".carousel-prev-btn");
        self.nextBtn = $carouselObj.find(".carousel-next-btn");
        // 圆锟斤拷锟叫伙拷锟斤拷锟斤拷
        self.cycleList = $carouselObj.find(".carousel-cycle");
        // 锟斤拷锟斤拷锟叫伙拷锟斤拷识
        self.toogleFlag = true;
        // 锟斤拷锟斤拷默锟斤拷圆锟斤拷锟绞?
        self.cycleIndex = 1;
        // 锟斤拷锟斤拷锟皆讹拷锟斤拷识
        self.timer = null;

        // 锟斤拷锟斤拷默锟斤拷锟斤拷锟矫诧拷锟斤拷
        self.setting = {
            "imgWidth":600,
            "imgHeight":400,
            "speed":500,
            "autoPlay":false,
            "delay":2000,
            "arrowIcon":false
        };

        // 锟斤拷默锟斤拷锟斤拷锟矫诧拷锟斤拷锟斤拷展锟斤拷锟矫伙拷锟皆讹拷锟斤拷锟斤拷锟?
        $.extend(self.setting,self.getSetting());
        var scale = self.setting.imgWidth/self.setting.imgHeight;
        if(self.setting.imgWidth > document.body.clientWidth){
            self.setting.imgWidth = document.body.clientWidth;
            self.setting.imgHeight = self.setting.imgWidth/scale;
        }
        // 锟斤拷锟矫诧拷锟斤拷
        self.setSettingValue();
        // 锟斤拷锟斤拷hover锟铰硷拷
        self.carousel.hover(function(){
            if(self.setting.arrowIcon){
                self.prevBtn.show();
                self.nextBtn.show();
            }
            self.setting.autoPlay = false;
            window.clearInterval(self.timer);
        },function(){
            self.prevBtn.hide();
            self.nextBtn.hide();
            self.setting.autoPlay = true;
            self.autoPlay();
        });
        // 锟斤拷锟斤拷锟斤拷锟叫伙拷锟斤拷钮锟铰硷拷
        self.prevBtn.bind("click",function(){
            if(self.toogleFlag){
                self.toogleFlag = false;
                self.toggleImage("left");
            }
        });
        self.nextBtn.bind("click",function(){
            if(self.toogleFlag){
                self.toogleFlag = false;
                self.toggleImage("right");
            }
        });
        // 锟斤拷锟斤拷圆锟斤拷锟叫伙拷锟铰硷拷
        // 圆锟斤拷锟叫伙拷锟斤拷
        self.cycleListItems = self.cycleList.find(".cycle-item");
        self.cycleLIstBtns = self.cycleListItems.find(".cycle-btn");
        self.firstCycleBtn = self.cycleLIstBtns.first();
        self.firstCycleBtn.addClass("on");
        self.cycleListItems.bind("click",function(){
            self.clickCycleBtn($(this));
        });
        if(self.setting.autoPlay){
            self.autoPlay();
        };
    };
    Carousel.prototype = {
        // 锟皆讹拷锟斤拷锟斤拷锟铰硷拷
        autoPlay:function(){
            var self = this;
            self.timer = window.setInterval(function() {
                self.nextBtn.click();
            },self.setting.delay);
        },
        // 锟斤拷锟斤拷谢锟皆诧拷锟斤拷录锟?
        clickCycleBtn:function(elem){
            var self = this;
            var currentIndex = self.cycleListItems.find(".on").attr("index");
            var currentClickIndex = elem.find(".cycle-btn").attr("index");
            if(currentClickIndex>currentIndex){
                var offset = currentClickIndex-currentIndex;
                self.cycleIndex = --currentClickIndex;
                self.carouselList.animate({
                    left:parseInt(self.carouselList.css("left"))-self.setting.imgWidth*offset
                },self.setting.speed);
                self.toogleCycle("right");
            }else if(currentClickIndex<currentIndex){
                var offset = currentIndex-currentClickIndex;
                self.cycleIndex = ++currentClickIndex;
                self.carouselList.animate({
                    left:parseInt(self.carouselList.css("left"))+self.setting.imgWidth*offset
                },self.setting.speed);
                self.toogleCycle("left");
            }
        },
        // 锟叫伙拷圆锟斤拷锟铰硷拷
        toogleCycle:function(dir){
            var self = this;
            self.cycleLIstBtns.removeClass("on");
            if(dir==="left"){
                if(self.cycleIndex == 1){
                    self.cycleIndex = self.cycleLIstBtns.length;
                    self.cycleLIstBtns.last().addClass("on");
                }else{
                    self.cycleIndex--;
                    self.cycleLIstBtns.each(function(){
                        if($(this).attr("index")==self.cycleIndex){
                            $(this).addClass("on");
                        } ;
                    });
                };
            }else if(dir==="right"){
                if(self.cycleIndex == self.cycleLIstBtns.length){
                    self.cycleIndex = 1;
                    self.cycleLIstBtns.first().addClass("on");
                }else{
                    self.cycleIndex++;
                    self.cycleLIstBtns.each(function(){
                        if($(this).attr("index")==self.cycleIndex){
                            $(this).addClass("on");
                        } ;
                    });
                };
            };
        },
        // 锟叫伙拷图片锟铰硷拷
        toggleImage:function(dir){
            var self = this;
            if(dir==="left"){
                self.carouselList.animate({
                    left:parseInt(self.carouselList.css("left"))+self.setting.imgWidth
                },self.setting.speed,function(){
                    if(parseInt(self.carouselList.css("left"))==0){
                        self.carouselList.css("left",-self.setting.imgWidth*5+"px");
                    };
                    self.toogleFlag = true;
                });
                // 锟叫伙拷圆锟斤拷
                self.toogleCycle(dir);

            }else if(dir==="right"){
                self.carouselList.animate({
                    left:parseInt(self.carouselList.css("left"))-self.setting.imgWidth
                },self.setting.speed,function(){
                    if(parseInt(self.carouselList.css("left"))==-self.setting.imgWidth*(self.carouselListItems.length-1)){
                        self.carouselList.css("left",-self.setting.imgWidth+"px");
                    };
                    self.toogleFlag = true;
                });
                self.toogleCycle("right");
            };
        },
        // 锟斤拷锟斤拷锟矫伙拷锟斤拷锟斤拷
        setSettingValue:function(){
            var self = this;
            // 锟斤拷锟矫诧拷锟斤拷锟斤拷锟斤拷叨群涂锟斤拷,锟斤拷图片锟斤拷雀叨锟斤拷锟揭伙拷锟?
            self.carousel.css({
                width:self.setting.imgWidth,
                height:self.setting.imgHeight
            });
            self.carouselListItems.css({
                width:self.setting.imgWidth,
                height:self.setting.imgHeight
            });
            // 锟斤拷锟斤拷图片锟斤拷锟斤拷锟侥高度和匡拷锟?
            self.carouselList.css({
                width:self.carouselListItems.length*self.setting.imgWidth,
                height:self.setting.imgHeight,
                left:-self.setting.imgWidth
            });
            // 锟斤拷锟斤拷锟斤拷锟铰帮拷钮位锟斤拷
            self.prevBtn.css({
                top:(self.setting.imgHeight-self.prevBtn.height())/2,
            });
            self.nextBtn.css({
                top:(self.setting.imgHeight-self.nextBtn.height())/2,
            });
            // 锟斤拷锟斤拷圆锟斤拷锟斤拷锟斤拷位锟矫硷拷圆锟斤拷锟斤拷锟?
            for(var i=0;i<self.carouselListItems.length-2;i++){
                self.cycleList.append('<li class="cycle-item"><span class="cycle-btn" index = "'+(i+1)+'"></span></li>');
            };
            self.cycleList.css({
                left:(self.setting.imgWidth-self.cycleList.width())/2
            });
        },
        // 锟斤拷取锟矫伙拷锟皆讹拷锟斤拷锟斤拷锟?
        getSetting:function(){
            var self = this;
            var customerSetting = self.carousel.attr("data-setting");
            if(customerSetting&&customerSetting!=""){
                return $.parseJSON(customerSetting);
            }else{
                return {};
            }

        }
    };
    /* 锟斤拷始锟斤拷锟斤拷锟斤拷锟斤拷锟?
     * $carouselObjs 锟斤拷示锟斤拷锟斤拷锟斤拷要锟斤拷锟斤拷锟斤拷锟斤拷募锟斤拷希锟絡Query锟斤拷锟斤拷
     */
    Carousel.init = function($carouselObjs){
        var self = this;
        $carouselObjs.each(function(){
            new self($(this));
        })
    };
    window["Carousel"] = Carousel;
})(jQuery);