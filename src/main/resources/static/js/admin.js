$(document).ready(function() {
    let isSelecting = false;
    let startX, startY;

    $('#office-map').on('mousedown', function(e) {
        isSelecting = true;
        const mapOffset = $(this).offset();
        startX = e.pageX - mapOffset.left;
        startY = e.pageY - mapOffset.top;
        $('#selection-area').css({
            left: startX + 'px',
            top: startY + 'px',
            width: '0px',
            height: '0px'
        }).show();
    });

    $(document).on('mousemove', function(e) {
        if (!isSelecting) return;

        const mapOffset = $('#office-map').offset();
        const currentX = e.pageX - mapOffset.left;
        const currentY = e.pageY - mapOffset.top;

        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);

        $('#selection-area').css({
            left: left + 'px',
            top: top + 'px',
            width: width + 'px',
            height: height + 'px'
        });
    });

    $(document).on('mouseup', function() {
        if (!isSelecting) return;

        isSelecting = false;
        const area = $('#selection-area');
        $('#x').val(parseInt(area.css('left')));
        $('#y').val(parseInt(area.css('top')));
        $('#width').val(parseInt(area.css('width')));
        $('#height').val(parseInt(area.css('height')));
        area.hide();
    });

    $('#location-form').submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        var url = $(this).attr('action');
        if ($('#location-id').val()) {
            url += '/' + $('#location-id').val();
        }
        $.post(url, formData, function() {
            location.reload();
        });
    });
});