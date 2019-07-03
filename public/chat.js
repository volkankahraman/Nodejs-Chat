var socket = io.connect(location.host);
$(document).ready(function(){
    $.get( "messages", function( data ) {
    $('#loading-gif').hide();
    data.forEach(element => {
        DisplayMessage(element)
    });
    });
});
//Query Dom
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    chatWindows = document.getElementById('chat-window'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feadback = document.getElementById('feedback');

var DisplayMessage = function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
    feadback.innerHTML = "";
    message.value = "";
    chatWindows.scrollTop = chatWindows.scrollHeight - chatWindows.clientHeight;
}
btn.addEventListener('click', function () {
    if (message.value === '' || handle.value === '') {
        alert("Mesaj veya Nick boş geçilemez.");
        return false;
    }
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keyup', function () {
    if (message.value == '')
        socket.emit('typing', null);
    else
        socket.emit('typing', handle.value);
});

socket.on('chatClient', function (data) {
    DisplayMessage(data);
});

socket.on('typing', function (data) {
    if (data == null)
        feadback.innerHTML = '';
    else
        feadback.innerHTML = '<p><em>' + data + ' mesaj yazıyor...</em></p>'
});