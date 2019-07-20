$(document).on('turbolinks:load', function(){
  $(function(){
    function messagePost(post){
      var html =  `<div class="message" data-message-id="${post.id}">
                    <div class="upper-info">
                    <p class="upper-info__user">${(post.name)}</p>
                    <p class="upper-info__date">${(post.date)}</p>
                    </div><p class="message__text">${(post.content)}</p>
                    <img src="${(post.image.url)}">`
      return html;
    }
    $('#new_message').on('submit',function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'JSON',
        processData: false,
        contentType: false
      })
      .done(function(post){
        if(post.image.url == null){
          post.image.url = ""
        }
        var html = messagePost(post)
        $(".messages").append(html)
        $("form")[0].reset()
        $('.form__submit').prop('disabled', false);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function(){
        alert('エラー')
        $('.form__submit').prop('disabled', false);
      })
    })

    function buildHTML(message) {
      if(message.image.url == null){
        message.image.url = ""
      }
        debugger
      var html = `<div class="message" data-message-id="${message.id}"> 
                  <div class="upper-info">
                  <p class="upper-info__user">${(message.user_name)}</p>
                  <p class="upper-info__date">${(message.created_at)}</p>
                  </div><p class="message__text">${(message.content)}</p>
                  <img src="${(message.image.url)}">`
                  
      return html;
    
    };
      $(function(){
        setInterval(reloadMessages, 3000);
        //10000ミリ秒ごとにupdateという関数を実行する
      });
 
        var reloadMessages = function() {
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.message:last').data("message-id"); 
        $.ajax({
          //ルーティングで設定した通りのURLを指定
          url: `api/messages`,
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'get',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {last_id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';//追加するHTMLの入れ物を作る
          messages.forEach(function (messages) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
            insertHTML = buildHTML(messages); //メッセージが入ったHTMLを取得
            $('.messages').append(insertHTML);//メッセージを追加
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
        })
        

        
        .fail(function() {
          console.log('error');
        });
      };
    
  });
});