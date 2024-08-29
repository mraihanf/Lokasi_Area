$(document).ready(function() {
    let locations = [];

    $.get('/api/locations', function(data) {
        locations = data;
    });

    $('#office-map').on('click', function(e) {
        const mapOffset = $(this).offset();
        const x = e.pageX - mapOffset.left;
        const y = e.pageY - mapOffset.top;

        const clickedLocation = locations.find(location =>
            x >= location.x && x <= (location.x + location.width) &&
            y >= location.y && y <= (location.y + location.height)
        );

        if (clickedLocation) {
            showLocationInfo(clickedLocation);
        }
    });

    function showLocationInfo(location) {
        $('#location-name').text(location.name);
        $('#location-description').text(location.description);
        $('#location-image').attr('src', location.imageUrl);
        $('#location-info').show();
    }
});