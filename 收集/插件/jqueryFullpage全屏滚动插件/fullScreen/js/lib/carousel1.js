/**
 * Created by admin on 2017/9/21.
 */
/*
 *�ֲ����?
 * ���ߣ�����
 * ���ڣ�2015-12-29
 * ���ܣ�
 * 1�������л���ť�ֲ�ͼƬ
 * 2���·�СԲ���л�ͼƬ
 * 3���Զ��ֲ�ͼƬ
 * ע�⣺
 * 1��ͼƬ�������ⳤ�ȴ�С��һ��ͼƬ��������õ������߹�������������ͼƬǰ�����������������Ҫһ��
 * 2�����ò����е�ͼƬ�߶�����Ҫ��ʵ�ʸ߶ȿ��һ�������������?
 * 3��СԲ�������ͼƬ����һ��?
 * 4��Ĭ���Զ��������������ֹͣ�������Ƴ����Զ������ָ�?
 */
;(function($){
    /*
     * $carouselObj ��ʾ�������jQuery����
     */
    var Carousel = function($carouselObj){
        var self = this;
        // ���浱ǰ�ֲ�����
        self.carousel = $carouselObj;
        // ul����
        self.carouselList = $carouselObj.find(".carousel-list");
        // ����li����
        self.carouselListItems = self.carouselList.find(".list-item");
        // �����л���ť
        self.prevBtn = $carouselObj.find(".carousel-prev-btn");
        self.nextBtn = $carouselObj.find(".carousel-next-btn");
        // Բ���л�����
        self.cycleList = $carouselObj.find(".carousel-cycle");
        // �����л���ʶ
        self.toogleFlag = true;
        // ����Ĭ��Բ����?
        self.cycleIndex = 1;
        // �����Զ���ʶ
        self.timer = null;

        // ����Ĭ�����ò���
        self.setting = {
            "imgWidth":600,
            "imgHeight":400,
            "speed":500,
            "autoPlay":false,
            "delay":2000,
            "arrowIcon":false
        };

        // ��Ĭ�����ò�����չ���û��Զ������?
        $.extend(self.setting,self.getSetting());
        var scale = self.setting.imgWidth/self.setting.imgHeight;
        if(self.setting.imgWidth > document.body.clientWidth){
            self.setting.imgWidth = document.body.clientWidth;
            self.setting.imgHeight = self.setting.imgWidth/scale;
        }
        // ���ò���
        self.setSettingValue();
        // ����hover�¼�
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
        // �������л���ť�¼�
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
        // ����Բ���л��¼�
        // Բ���л���
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
        // �Զ������¼�
        autoPlay:function(){
            var self = this;
            self.timer = window.setInterval(function() {
                self.nextBtn.click();
            },self.setting.delay);
        },
        // ����л�Բ���¼�?
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
        // �л�Բ���¼�
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
        // �л�ͼƬ�¼�
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
                // �л�Բ��
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
        // �����û�����
        setSettingValue:function(){
            var self = this;
            // ���ò�������߶ȺͿ��,��ͼƬ��ȸ߶���Ҫһ��?
            self.carousel.css({
                width:self.setting.imgWidth,
                height:self.setting.imgHeight
            });
            self.carouselListItems.css({
                width:self.setting.imgWidth,
                height:self.setting.imgHeight
            });
            // ����ͼƬ�����ĸ߶ȺͿ��?
            self.carouselList.css({
                width:self.carouselListItems.length*self.setting.imgWidth,
                height:self.setting.imgHeight,
                left:-self.setting.imgWidth
            });
            // �������°�ťλ��
            self.prevBtn.css({
                top:(self.setting.imgHeight-self.prevBtn.height())/2,
            });
            self.nextBtn.css({
                top:(self.setting.imgHeight-self.nextBtn.height())/2,
            });
            // ����Բ������λ�ü�Բ�����?
            for(var i=0;i<self.carouselListItems.length-2;i++){
                self.cycleList.append('<li class="cycle-item"><span class="cycle-btn" index = "'+(i+1)+'"></span></li>');
            };
            self.cycleList.css({
                left:(self.setting.imgWidth-self.cycleList.width())/2
            });
        },
        // ��ȡ�û��Զ������?
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
    /* ��ʼ���������?
     * $carouselObjs ��ʾ������Ҫ��������ļ��ϣ�jQuery����
     */
    Carousel.init = function($carouselObjs){
        var self = this;
        $carouselObjs.each(function(){
            new self($(this));
        })
    };
    window["Carousel"] = Carousel;
})(jQuery);