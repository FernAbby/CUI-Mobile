(function ($) {
    function Actions(option) {
        var defaultOption = {
            title: '',
            pick: '',
            items: ['选项1', '选项2'],
            clickFun: function (value) {
            },
            cancelFun: function () {
            }
        }
        var $modal,$wrap,$overlay, _this = this;
        var opts = $.extend(defaultOption, option);
        var html = '<div class="actions-wrap"><div class="modal-overlay"></div><div class="actions-modal"><ul class="items">';
        if (opts.title) {
            html += '<li class="title">' + opts.title + '</li>';
        }
        for (var i = 0; i < opts.items.length; i++) {
            html += '<li>' + opts.items[i] + '</li>';
        }
        html += '</ul><div class="cancel-btn">取消</div></div></div>';
        $wrap = $(html).appendTo(document.body);
        $modal = $wrap.find('.actions-modal');
        $overlay = $wrap.find('.modal-overlay');

        if (opts.pick && $(opts.pick).length) {
            $(opts.pick).on('click', function (e) {
                _this.open();
            });
        }
        $modal.on('click', '.cancel-btn', function (e) {
            _this.close();
            opts.cancelFun();
        });
        $modal.on('click', '.items li:not(.title)', function (e) {
            _this.close($modal);
            opts.clickFun($(this).text());
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

    $.actions = function (option) {
        return new Actions(option);
    };

})(Zepto);