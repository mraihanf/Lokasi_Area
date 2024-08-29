$(document).ready(function() {
    let isSelecting = false;
    let startX, startY;

    $('#office-map').on('mousedown', function(e) {
        isSelecting = true;
        const mapOffset = $(this).offset();
        startX = e.pageX - mapOffset.left;
        startY = e.pageY - mapOffset.top;

        // Reset and show the selection area
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

        console.log("Width:", width);
        console.log("Height:", height);

        // Update selection area dimensions
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
        const x = parseInt(area.css('left'));
        const y = parseInt(area.css('top'));
        const width = parseInt(area.css('width'));
        const height = parseInt(area.css('height'));

        // Log the final values after the selection
        console.log("Selection Completed:");
        console.log("X:", x);
        console.log("Y:", y);
        console.log("Width:", width);
        console.log("Height:", height);

        $('#x').val(x);
        $('#y').val(y);
        $('#width').val(width);
        $('#height').val(height);
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
