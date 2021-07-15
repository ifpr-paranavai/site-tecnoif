(function() {
    var HOST = "http://localhost/upload.php"
 
    addEventListener("trix-attachment-add", function(event) {
        if (event.attachment.file) {
            uploadFileAttachment(event.attachment)
        }
    })
 
    function uploadFileAttachment(attachment) {
        uploadFile(attachment.file, setProgress, setAttributes)
 
        function setProgress(progress) {
            attachment.setUploadProgress(progress)
        }
 
        function setAttributes(attributes) {
            attachment.setAttributes(attributes)
        }
    }
 
    function uploadFile(file, progressCallback, successCallback) {
        var formData = createFormData(file)
        var xhr = new XMLHttpRequest()
 
        xhr.open("POST", HOST, true)
 
        xhr.upload.addEventListener("progress", function(event) {
            var progress = event.loaded / event.total * 100
            progressCallback(progress)
        })
 
        xhr.addEventListener("load", function(event) {
            var attributes = {
                url: xhr.responseText,
                href: xhr.responseText + "?content-disposition=attachment"
            }
            successCallback(attributes)
        })
 
        xhr.send(formData)
    }
 
    function createFormData(file) {
        var data = new FormData()
        data.append("Content-Type", file.type)
        data.append("file", file)
        return data
    }
})();