let codePreview;

codePreview = document.getElementById('textarea');

module.exports = {
    updateCodePreview(code) {
        codePreview.value = code;
    }
}