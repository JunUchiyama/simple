$(function(){
    // 横幅などの設定
    var options = {
        maxWidth : 1000, // #photo_container の max-width を指定(px)
        thumbMaxWidth : 160, // #thumbnail li の max-width を指定(px) 
        thumbMinWidth : 160, // #thumbnail li の min-width を指定(px) 
        fade : 500 // フェードアウトするスピードを指定
    };
     
    $(function(){
    // 変数を作る
    var thumbList = $('#thumbnail').find('a'),
        mainPhoto = $('#main-photo'),
        img = $('<img />'),
        imgHeight;
         
        // 親ボックスと li 要素に max-width 指定
        $('#photo_container').css('maxWidth', options.maxWidth);
         
        // 最初の画像の div#main-photo へ表示と current クラスを指定
        img = img.attr({
                src: $(thumbList[0]).attr('href'),
                alt: $(thumbList[0]).find('img').attr('alt')
        });
        mainPhoto.append(img);
        $('#thumbnail li:first').addClass('current');
 
        // メイン画像を先に読み込んどく
        for(var i = 0; i < thumbList.length; i++){
            $('<img />').attr({
                src: $(thumbList[i]).attr('href'),
                alt: $(thumbList[i]).find('img').attr('alt')
            });
        }
         
        // サムネイルのクリックイベント
        thumbList.on('click', function(){ 
            // img 要素を作り サムネイル画像からリンク・altの情報を取得・設定する
            var photo = $('<img />').attr({
                src: $(this).attr('href'),
                alt: $(this).find('img').attr('alt')
            });
 
            // div#main-photo へ 上で作った img 要素を挿入する
            mainPhoto.find('img').before(photo);
            // div#main-photo に先に表示されていた img 要素をフェードしながら非表示にし要素を消す、 
            mainPhoto.find('img:not(:first)').stop(true, true).fadeOut(options.fade, function(){
                $(this).remove();
            });
             
            // 新しく表示した img の親 li へ .current を付け、
            // 他の li 要素についていた .current を削除する
            $(this).parent().addClass('current').siblings().removeClass('current');
            return false;
        });    
         
        // ウィンドウが読み込まれた時とリサイズされた時に 
        // div#main-photo の高さを img の高さへ変更する
        $(window).on('resize load', function(){
            mainPhoto.height(mainPhoto.find('img').outerHeight());
        });
    });
});