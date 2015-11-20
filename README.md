# Angular Doc Preview

This library is a directive that allows you to show a file preview from a given url. The preview can be:
* a link showing the file name with an icon corresponding with the file extension.
* a thumbnail if the document's url represents an image file.

## Installation

```bash
bower install https://github.com/platanus/angular-doc-preview --save
```

Include the JS files in your project and the library as an Angular Dependency

```javascript
angular.module('yourapp', ['platanus.docPreview']);
```

> The library comes with a proposed stylesheet under `/dist/angular-doc-preview.css`. You can use it or create your own.

## Usage

This directive allows you to show a file preview from a given url.
By default, this directive, will try to infer the file type from the url. For example, if the given url has the value: `http://server.platan.us/files/my-file.xls?1435170296`, the directive will notice the url represents an Excel file and will show a link with an **"Excel icon"**. If, for example, the url contains `http://server.platan.us/files/my-smiley-face.png` then, by default, will show a **thumbnail** with a link.

### Link

```json
{
  "documentUrl": "http://server.platan.us/promotions/9/download",
  "documentName": "my-xls-file",
}
```

```html
<doc-preview
  document-extension="xls"
  document-name="data.documentName"
  document-url="data.documentUrl">
</doc-preview>
```

<img src="./docs/images/doc-example.png" />

```json
{
  "documentUrl": "http://server.platan.us/files/goten.png",
}
```

### Thumbnail

```html
<doc-preview
  render-image-as="thumb"
  document-url="data.documentUrl">
</doc-preview>
```

<img src="./docs/images/img-example.png" />

## Directive Options:

### Mandatory

- *document-url:* the url containing the image to show.

### Optional

- *document-name:* set this value if you want a custom text for the resultant link. By default, will show the url.
- *document-extension:* sometimes, the url does not have information about the file type (for example: `http://server.platan.us/users/9/download`). But, if you know the url file type you can pass it as option.
- *no-document-text:* custom message to show when the url is empty. By default, will show nothing.
- *render-image-as:* this option is only for images. You can choose, to show images: as `link` or `thumb`. If this attribute is not present will show thumbnail and link.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Credits

Thank you [contributors](https://github.com/platanus/angular-doc-preview/graphs/contributors)!

<img src="http://platan.us/gravatar_with_text.png" alt="Platanus" width="250"/>

angular-doc-preview is maintained by [platanus](http://platan.us).

## License

angular-doc-preview is © 2015 platanus, spa. It is free software and may be redistributed under the terms specified in the LICENSE file.
