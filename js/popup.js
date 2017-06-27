(function ($) {
    function Popup(option) {
        var defaultOption = {
            title: '这是标题',
            pick: '',
            type: 'ttype',
            content: [''],
            format: true,
            cancelFun: function () {
            }
        }
        var $modal, _this = this, html, $wrap, $overlay;
        var opts = $.extend(defaultOption, option);
        html = '<div class="popup-modal-wrap"><div class="popup-overlay"></div><div class="popup-modal ' + opts.type + '"><div class="modal-content"><div class="header">'
            + opts.title + '</div><div class="content">';
        function ctype(){
            var subhtml = '<ul>';
            subhtml += '<li><span class="label">姓名</span><span class="value">'+opts.content.name+'</span></li>';
            if(opts.content.lastName){
                subhtml += '<li><span class="label">英文姓</span><span class="value">'+opts.content.lastName+'</span></li>';
            }
            if(opts.content.firstName){
                subhtml += '<li><span class="label">英文名</span><span class="value">'+opts.content.firstName+'</span></li>';
            }
            subhtml += '<li><span class="label">手机号</span><span class="value">'+opts.content.mobile+'</span></li>'
                +'<li><span class="label">'+opts.content.idType+'</span><span class="value">'+opts.content.idNo+'</span></li></ul>';
            return subhtml;
        }
        if (opts.type == 'ctype' && opts.format) {
            html += ctype();
        }else{
            html += opts.content[0];
        }
        html += '</div><div class="close">取消</div></div></div></div>';
        $wrap = $(html).appendTo(document.body);
        $modal = $wrap.find('.popup-modal');
        $overlay = $wrap.find('.popup-overlay');

        if (opts.pick && $(opts.pick).length) {
            $(opts.pick).on('click', function (e) {
                _this.open();
            });
        }

        $modal.on('click', '.close', function (e) {
            _this.close();
            opts.cancelFun();
        });
        _this.open = function () {
            $wrap.show();
            $wrap[0].clientLeft;
            $modal.addClass('show');
            $overlay.addClass('visible');
        }
        _this.close = function () {
            $modal.removeClass('show');
            $overlay.removeClass('visible');
            setTimeout(function () {
                $wrap.hide();
            }, 400);
        }
        return _this;
    }
    $.popup = function (option) {
        return new Popup(option);
    };
})(Zepto);