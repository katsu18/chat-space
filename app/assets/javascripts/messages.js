$(document).on('turbolinks:load', function(){
  $(function(){
    function messagePost(post){
      var html =  `<div class="upper-info">
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
        $(".message").append(html)
        $("form")[0].reset()
        $('.form__submit').prop('disabled', false);
        $('.messages').animate({scrollTop: $('.message')[0].scrollHeight});
      })
      .fail(function(){
        alert('エラー')
        $('.form__submit').prop('disabled', false);
      })
    })
  });
});