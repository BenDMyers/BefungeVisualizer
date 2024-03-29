window.onload = function() {
    var dropZone = document.getElementById('drop-zone');
    var h = document.getElementById('h');
    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone vertical-align';
        h.className = '';
        handleDrop(e.dataTransfer.files[0]);
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop vertical-align';
        h.className = 'green-text';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone vertical-align';
        h.className = '';
        return false;
    }
}
