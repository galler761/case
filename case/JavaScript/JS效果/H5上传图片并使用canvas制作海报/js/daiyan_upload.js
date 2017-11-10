//图片上传
var file = {
    upload: function (e) {
        var file = e.target.files[0];
        var type = file.type.split('/')[0];
        if (type != 'image') {
            alert('请上传图片');
            return;
        }

        //var size = Math.floor(file.size / 1024 / 1024);
        //if (size > 3) {
        //    alert('图片大小不得超过3M');
        //    return;
        //};

        var reader = new FileReader();
        reader.readAsDataURL(file);

        var orientation = null;
        //获取照片方向角属性，用户旋转控制  
        EXIF.getData(file, function () { 
            EXIF.getAllTags(this);  
            orientation = EXIF.getTag(this, 'Orientation');  
        });

         reader.onloadstart = function () {
             $(".ajaxLoading").show();
         };
        reader.onloadend = function (e) {
            var dataURL = reader.result;
            var imaged = new Image();
            imaged.src = dataURL;
            imaged.onload = function () {               
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                //普通环境下设置canvas的宽高
                var w = 0,
                    h = 0;
                if (this.width < 750) {
                    w = this.width;
                    h = this.height;
                    canvas.width = w;
                    canvas.height = h;
                } else {
                    w = 750;
                    canvas.width = w;
                    var scale = this.width / this.height;
                    w = w > this.width ? this.width : w;
                    h = w / scale;
                    canvas.height = h;
                }                

                if (navigator.userAgent.match(/iphone/i)) {
                    if (orientation != "") {
                        switch (orientation) {
                            case 3:
                                ctx.rotate(180 * Math.PI / 180);
                                ctx.drawImage(this, -w, -h, w, h);
                                break;
                            case 6:
                                //这里由于将图片纠正了回来，所以也要重新设置canvas的高已达到高度自适应
                                canvas.width = 750;
                                var scale = this.height / this.width;
                                canvas.height = canvas.width / scale;
                                h = 750 > this.height ? this.height : 750;
                                w = h / scale;
                                ctx.rotate(90 * Math.PI / 180);                                
                                ctx.drawImage(this, 0, -h, w, h);
                                break;
                            case 8:
                                ctx.rotate(270 * Math.PI / 180);
                                ctx.drawImage(this, -h, 0, h, w);
                                break;
                            case 2:
                                ctx.translate(w, 0);
                                ctx.scale(-1, 1);
                                ctx.drawImage(this, 0, 0, w, h);
                                break;
                            case 4:
                                ctx.translate(w, 0);
                                ctx.scale(-1, 1);
                                ctx.rotate(180 * Math.PI / 180);
                                ctx.drawImage(this, -w, -h, w, h);
                                break;
                            case 5:
                                ctx.translate(w, 0);
                                ctx.scale(-1, 1);
                                ctx.rotate(90 * Math.PI / 180);
                                ctx.drawImage(this, 0, -w, h, w);
                                break;
                            case 7:
                                ctx.translate(w, 0);
                                ctx.scale(-1, 1);
                                ctx.rotate(270 * Math.PI / 180);
                                ctx.drawImage(this, -h, 0, h, w);
                                break;
                            default:
                                ctx.drawImage(this, 0, 0, w, h);
                        }
                    }
                } else {
                    ctx.drawImage(this, 0, 0, w, h);
                }

                $("#daiyan_bg").attr("src", canvas.toDataURL('image/jpeg'));
                $(".ajaxLoading").hide();
                var qrCodeH = 0;
                if (navigator.userAgent.match(/iphone/i)) {
                    if (orientation != "") {
                        switch (orientation) {
                            case 6:
                                qrCodeH = w / 2 - $(".qrcode").height() - 105;
                                break;
                            default:
                                qrCodeH = h / 2 - $(".qrcode").height() - 105;
                        }
                    }
                } else {
                    qrCodeH = h / 2 - $(".qrcode").height() - 105;
                }
                $(".qrcode").css("top", qrCodeH);
                $(".page1").hide().siblings(".page2").show();
            };          
        };
    },
    event: function () {
        $(".uploadfile").change(function (e) {
            file.upload(e);
        });
    },
    init: function () {
        this.event();
    }
};
file.init();