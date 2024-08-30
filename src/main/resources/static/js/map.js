$(document).ready(function() {
    let locations = [];
    let zoomLevel = 1; // Default zoom level
    let startX, startY, startLeft, startTop;
    let mapOffsetX = 0, mapOffsetY = 0;

    $.get('/api/locations', function(data) {
        locations = data;
        renderLocations();
    });

    function renderLocations() {
        $('#location-markers').empty();
        locations.forEach(location => {
            const locationDiv = $('<div></div>').css({
                position: 'absolute',
                left: (location.x * zoomLevel) + 'px',
                top: (location.y * zoomLevel) + 'px',
                width: (location.width * zoomLevel) + 'px',
                height: (location.height * zoomLevel) + 'px',
                border: '2px solid red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                zIndex: 10,
                cursor: 'pointer'
            }).appendTo('#location-markers');

            locationDiv.on('click', function() {
                showLocationInfo(location);
            });
        });
    }

    function showLocationInfo(location) {
        $('#location-name').text(location.name);
        $('#location-description').text(location.description);
        $('#location-image').attr('src', location.imageUrl);
        $('#location-info').show();
    }

    $('#close-info').on('click', function() {
        $('#location-info').hide();
    });

    // Handle panning with mouse and touch events
    $('#map-container').on('mousedown touchstart', function(e) {
        e.preventDefault();
        const offset = $(this).offset();
        startX = e.pageX || e.originalEvent.touches[0].pageX;
        startY = e.pageY || e.originalEvent.touches[0].pageY;
        startLeft = mapOffsetX;
        startTop = mapOffsetY;

        $(document).on('mousemove touchmove', function(e) {
            e.preventDefault();
            const moveX = (e.pageX || e.originalEvent.touches[0].pageX) - startX;
            const moveY = (e.pageY || e.originalEvent.touches[0].pageY) - startY;
            mapOffsetX = startLeft - moveX;
            mapOffsetY = startTop - moveY;
            updateTransform();
        });

        $(document).on('mouseup touchend', function() {
            $(document).off('mousemove touchmove mouseup touchend');
        });
    });

    // Handle zoom with mouse wheel
    $('#map-container').on('wheel', function(e) {
        e.preventDefault();
        const zoomAmount = e.originalEvent.deltaY > 0 ? -0.1 : 0.1;
        zoomLevel = Math.max(0.1, zoomLevel + zoomAmount);
        updateTransform();
    });

    function updateTransform() {
        $('#map-content').css({
            'transform': `scale(${zoomLevel}) translate(${mapOffsetX}px, ${mapOffsetY}px)`,
            'transform-origin': '0 0'
        });
        renderLocations(); // Re-render locations to adjust to the new zoom level
    }
});
