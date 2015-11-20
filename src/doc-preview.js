(function(){

angular
  .module('platanus.docPreview')
  .directive('docPreview', docPreview);

function docPreview(encodedIcons) {
  var directive = {
    template:
      '<div class="doc-preview">' +
        '<p class="no-document-text" ng-if="getNoDocumentText()">{{ getNoDocumentText() }}</p>' +
        '<img class="image-preview" ng-class="{ icon: !imageAsPreview() }" ng-if="imageSrc()" ng-src="{{ imageSrc() }}"/>' +
        '<a class="doc-link" ng-if="linkUrl()" href="{{ linkUrl() }}" target="_blank">' +
          '{{ linkLabel() }}' +
        '</a>' +
      '</div>',
    restrict: 'E',
    replace: true,
    scope: {
      documentUrl: '=',
      documentName: '=',
      documentExtension: '@',
      noDocumentText: '@',
      renderImageAs: '@'
    },
    link: link
  };

  return directive;

  function link(_scope) {
    _scope.linkLabel = linkLabel;
    _scope.imageSrc = imageSrc;
    _scope.imageAsPreview = imageAsPreview;
    _scope.linkUrl = linkUrl;
    _scope.getNoDocumentText = getNoDocumentText;

    function getImageExtensions(){
      var IMAGE_EXTENSIONS = ['gif', 'jpeg', 'jpg', 'png', 'bmp'];

      return IMAGE_EXTENSIONS;
    }

    function getKnownExtensions(){
      var OTHER_EXTENSIONS = [
        '3gp', 'ai', 'bin', 'dat', 'divx', 'dll', 'dmg', 'doc', 'docx', 'dwg', 'exe', 'fla', 'flv',
        'htm', 'html', 'iso', 'jar', 'log', 'm4a', 'm4b', 'm4p', 'm4v', 'mcd', 'mdb', 'mid', 'mov',
        'mp2', 'mp4', 'mpeg', 'mpg', 'ogg', 'pdf', 'pps', 'psd', 'rar', 'rm', 'rmvb', 'rtf', 'swf',
        'tgz', 'tif', 'tmp', 'torrent', 'ttf', 'txt', 'vcd', 'vob', 'wav', 'wma', 'wmv', 'xls',
        'xlsx', 'zip'
      ];

      return getImageExtensions().concat(OTHER_EXTENSIONS);
    }

    function isImageType() {
      return docType() === 'image';
    }

    function hasNoFile() {
      return docType() === 'none';
    }

    function getDocExtension() {
      if(!!_scope.documentExtension) return _scope.documentExtension;
      if(!_scope.documentUrl) return;
      var ext = _scope.documentUrl.split('/').pop();
      return ext.split('?').shift().split('.').pop();
    }

    function docIcon() {
      var extension = getDocExtension();
      if(getKnownExtensions().indexOf(extension) === -1) return 'unknown';
      return extension;
    }

    function docType() {
      if(!_scope.documentUrl) return 'none';
      var extension = getDocExtension();
      if(getImageExtensions().indexOf(extension) !== -1) return 'image';
      return 'other';
    }

    function linkLabel() {
      return _scope.documentName || _scope.documentUrl;
    }

    function encodedIcon() {
      var icon = encodedIcons[docIcon()];
      if(!icon) return encodedIcons.unknown;
      return icon;
    }

    function imageSrc() {
      if(hasNoFile()) return '';
      return imageAsPreview() ? _scope.documentUrl : encodedIcon();
    }

    function imageAsPreview() {
      return (isImageType() && _scope.renderImageAs !== 'link');
    }

    function linkUrl() {
      if(hasNoFile() || (isImageType() && _scope.renderImageAs === 'thumb')) return '';

      return _scope.documentUrl;
    }

    function getNoDocumentText(){
      if(hasNoFile() && _scope.noDocumentText) return _scope.noDocumentText;

      return false;
    }
  }
}

docPreview.$inject = ['encodedIcons'];

})();
