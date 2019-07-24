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
      var html = `<div class="message" data-message-id="${message.id}"> 
                  <div class="upper-info">
                  <p class="upper-info__user">${(message.user_name)}</p>
                  <p class="upper-info__date">${(message.created_at)}</p>
                  </div><p class="message__text">${(message.content)}</p>
                  <img src="${(message.image.url)}">`
                  
      return html;
    
    };
   
        var reloadMessages = function() {
        var last_message_id = $('.message:last').data("message-id"); 
        $.ajax({
          url: `api/messages`,
          type: 'get',
          dataType: 'json',
          data: {last_id: last_message_id}
        })
        .done(function(messages) {
          messages.forEach(function (messages) {
            insertHTML = buildHTML(messages); 
            $('.messages').append(insertHTML);
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        .fail(function() {
        });
      };
      $(function(){
        setInterval(reloadMessages, 5000);
      });
  });
});