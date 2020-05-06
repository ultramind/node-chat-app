var socket = io();
// scrolling function
function scrollTobottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }


}

socket.on('connect', function() {
    console.log('Connectes to Server');
    
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollTobottom();
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // console.log('New message', message);
    // var li = jQuery('<li></li>');

    // li.text(`${message.from}: ${formattedTime} ${message.text}`);
    // jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messssageTexBox = jQuery('[name=message]')
    socket.emit('newMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (data) {
         messssageTexBox.val('');
    });
});

socket.on('getLocation', (data) => {
    var formattedTime = moment(data.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: data.from,
        url: data.url,
        createdAt: formattedTime
    })
    // var formattedTime = moment(data.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank"> My Current Location</a>');
    // li.text(`${data.from}: ${formattedTime}`);
    // a.attr('href', data.url);
    // li.append(a);
    var messages = jQuery('#messages');
    messages.append(html);
    scrollTobottom();
}, function(error) {
    
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return console.log('Could not get location');
    }
    locationButton.attr('disabled', 'disabled').text('sending Location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Sedn Location');
        socket.emit('getLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
     }, function () {
         locationButton.attr('disabled', 'disabled').test('Send Location')
        alert('Unable to fetch location');
    });
});

