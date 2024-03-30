
// debounce関数
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


//ハンバーガーメニューをクリックした際の処理
$(function() {
	$('#menubar_hdr').click(function() {
		$(this).toggleClass('ham');

			if($(this).hasClass('ham')) {
				$('#menubar,#menubar_hdr_inner').addClass('d-b');
			} else {
				$('#menubar,#menubar_hdr_inner').removeClass('d-b');
			}

	});
});


// 同一ページへのリンクの場合に開閉メニューを閉じる処理
$(function() {
	$('#menubar a[href^="#"]').click(function() {
		$('#menubar,#menubar_hdr_inner').removeClass('d-b');
		$('#menubar_hdr,#menubar_hdr_inner').removeClass('ham');
	});
});


// スムーススクロール（※通常）
$(window).on("load resize", debounce(function() {
    // 既存のアニメーションを停止。
    $('body,html').stop();

    var hash = location.hash;
    if(hash) {
        $('body,html').scrollTop(0);
        setTimeout(function() {
            var target = $(hash);
            var scroll = target.offset().top;
            // ここでも.stop()を呼び出して、以前のアニメーションを停止。
            $('body,html').stop().animate({scrollTop: scroll}, 500);
        }, 100);
    }
    $('a[href^="#"]').click(function() {
        var href = $(this).attr('href');
        var target = href == '#' ? 0 : $(href).offset().top;
        // ここでも.stop()を呼び出して、以前のアニメーションを停止。
        $('body,html').stop().animate({scrollTop: target}, 500);
        return false;
    });
}, 100)); // debounceの待機時間も適宜調整。


//pagetop
$(function() {
    var scroll = $('.pagetop');
    var scrollShow = $('.pagetop-show');
        $(scroll).hide();
        $(window).scroll(function() {
            if($(this).scrollTop() >= 300) {
                $(scroll).fadeIn().addClass(scrollShow);
            } else {
                $(scroll).fadeOut().removeClass(scrollShow);
            }
        });
});


// 汎用開閉処理
$(function() {
	$('.openclose').next().hide();
	$('.openclose').click(function() {
		$(this).next().slideToggle();
		$('.openclose').not(this).next().slideUp();
	});
});


// テキストのフェードイン効果
$(function() {
    $('.fade-in-text').on('inview', function(event, isInView) {
        // この要素が既にアニメーションされたかどうかを確認
        if (isInView && !$(this).data('animated')) {
            // アニメーションがまだ実行されていない場合
            let innerHTML = '';
            const text = $(this).text();
            $(this).text('');

            for (let i = 0; i < text.length; i++) {
                innerHTML += `<span class="char" style="animation-delay: ${i * 0.1}s;">${text[i]}</span>`;
            }

            $(this).html(innerHTML).css('visibility', 'visible');
            // アニメーションが実行されたことをマーク
            $(this).data('animated', true);
        }
    });
});


$(function() {
    // ロゴの初期のtop位置を取得（ページ上部からの距離）
    var initialTop = $("#logo").offset().top;

    $(window).scroll(function() {
        // スクロール量を取得
        var scrollTop = $(window).scrollTop();

        // #logoのスクロールに応じた位置調整
        // ここでは、ロゴの初期位置からスクロール量の1/2だけ動かすことで、
        // デフォルトの位置を基準に動くようにします。
        // スクロールに応じてロゴが動く速度を調整したい場合は、2の値を変更します。
        $("#logo").css('top', (initialTop - scrollTop / 2) + 'px');
    });
});
