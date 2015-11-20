ngDescribe({
  name: 'Doc preview directive with undefined document url',
  modules: 'platanus.docPreview',
  exposeApi: true,
  element: '<doc-preview></doc-preview>',

  tests: function (deps, describeApi) {
    it('renders nothing', function () {
      var message = deps.element[0].querySelectorAll('.no-document-text')[0];
      var thumbnail = deps.element[0].querySelectorAll('.image-preview')[0];
      var link = deps.element[0].querySelectorAll('.doc-link')[0];

      expect(message).toBe(undefined);
      expect(thumbnail).toBe(undefined);
      expect(link).toBe(undefined);
    });

    describe('and custom no document text', function(){
      beforeEach(function(){
        describeApi.setupElement('<doc-preview no-document-text="no file present"></doc-preview>');
      });

      it('renders no text label message', function () {
        var element = deps.element.find('p');
        expect(element.text()).toMatch('no file present');
      });
    });
  }
});

ngDescribe({
  name: 'Doc preview directive with image url',
  modules: 'platanus.docPreview',
  parentScope: { documentUrl: 'http://some-url.com/file.png' },
  element: '<doc-preview document-url="documentUrl"></doc-preview>',

  tests: function (deps) {
    it('renders image thumbnail', function () {
      var img = deps.element.find('img');
      expect(img.prop('src')).toMatch('http://some-url.com/file.png');
    });

    it('renders image link', function () {
      var link = deps.element.find('a');
      expect(link.text()).toMatch('http://some-url.com/file.png');
    });

    it('removes icon class from image', function() {
      var img = deps.element[0].querySelectorAll('.icon')[0];
      expect(img).toBe(undefined);
    });
  }
});

ngDescribe({
  name: 'Doc preview directive with image url and render-image-as attribute as link',
  modules: 'platanus.docPreview',
  parentScope: { documentUrl: 'http://some-url.com/file.png' },
  mock: {
    'platanus.docPreview': {
      'encodedIcons': {
        'png': 'encoded_png_file'
      }
    }
  },
  inject: 'encodedIcons',
  element: '<doc-preview render-image-as="link" document-url="documentUrl"></doc-preview>',

  tests: function (deps) {
    it('renders image icon', function() {
      var img = deps.element.find('img');
      expect(img.prop('src')).toMatch(deps.encodedIcons.png);
    });

    it('shows link with valid url', function() {
      var link = deps.element.find('a');
      expect(link.text()).toMatch('http://some-url.com/file.png');
    });

    it('adds icon class to image', function() {
      var img = deps.element[0].querySelectorAll('.icon')[0];
      expect(img).not.toBe(undefined);
    });
  }
});

ngDescribe({
  name: 'Doc preview directive with image url and render-image-as attribute as thumb',
  modules: 'platanus.docPreview',
  parentScope: { documentUrl: 'http://some-url.com/file.png' },
  element: '<doc-preview render-image-as="thumb" document-url="documentUrl"></doc-preview>',

  tests: function (deps) {
    it('renders image thumbnail', function() {
      var img = deps.element.find('img');
      expect(img.prop('src')).toMatch('http://some-url.com/file.png');
    });

    it('hides link', function() {
      var link = deps.element[0].querySelectorAll('a')[0];
      expect(link).toBe(undefined);
    });

    it('removes icon class from image', function() {
      var img = deps.element[0].querySelectorAll('.icon')[0];
      expect(img).toBe(undefined);
    });
  }
});

ngDescribe({
  name: 'Doc preview directive with explicit extension',
  modules: 'platanus.docPreview',
  parentScope: { documentUrl: 'http://some-url.com/file.png' },
  mock: {
    'platanus.docPreview': {
      'encodedIcons': {
        'doc': 'encoded_doc_file'
      }
    }
  },
  inject: 'encodedIcons',
  element: '<doc-preview document-extension="doc" document-url="documentUrl"></doc-preview>',

  tests: function (deps) {
    it('shows a link with icon matching document-extension attribute',function(){
      var element = deps.element.find('img');
      expect(element.prop('src')).toMatch(deps.encodedIcons.doc);
    });
  }
});

ngDescribe({
  name: 'Doc preview directive with no image url',
  modules: 'platanus.docPreview',
  parentScope: { documentUrl: 'http://some-url.com/file.xls' },
  mock: {
    'platanus.docPreview': {
      'encodedIcons': {
        'xls': 'encoded_xls_file'
      }
    }
  },
  inject: 'encodedIcons',
  element: '<doc-preview document-url="documentUrl"></doc-preview>',

  tests: function (deps) {
    it('shows icon for document file',function(){
      var element = deps.element.find('img');
      expect(element.prop('src')).toMatch(deps.encodedIcons.xls);
    });

    it('shows file url as default link label',function(){
      var link = deps.element.find('a');
      expect(link.text()).toMatch('http://some-url.com/file.xls');
    });
  }
});

ngDescribe({
  name: 'Doc preview directive with custom link label',
  modules: 'platanus.docPreview',
  parentScope: {
    documentUrl: 'http://some-url.com/file.xls',
    documentName: 'my-file-link'
  },
  element: '<doc-preview document-name="documentName" document-url="documentUrl"></doc-preview>',

  tests: function (deps) {
    it('shows link with custom label',function(){
      var link = deps.element.find('a');
      expect(link.text()).toMatch('my-file-link');
    });
  }
});

ngDescribe({
  name: 'Doc preview directive with unknown url extension',
  modules: 'platanus.docPreview',
  parentScope: {
    documentUrl: 'http://uplaods/22/download',
    documentName: 'my-file-link'
  },
  mock: {
    'platanus.docPreview': {
      'encodedIcons': {
        'unknown': 'encoded_unknown_file'
      }
    }
  },
  inject: 'encodedIcons',
  element: '<doc-preview document-url="documentUrl"></doc-preview>',

  tests: function (deps) {
    it('shows icon for unknown file',function(){
      var element = deps.element.find('img');
      expect(element.prop('src')).toMatch(deps.encodedIcons.unknown);
    });
  }
});
