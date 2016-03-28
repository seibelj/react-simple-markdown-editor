## Simple React Markdown Editor ##
This makes it easy to add a simple markdown editing widget to any TextArea element.
![example](https://raw.githubusercontent.com/seibelj/react-simple-markdown-editor/master/doc/pic.png)

### Demo
[CodePen Demo](http://codepen.io/seibelj/pen/rewRMe)

### Installation
`npm install react-simple-markdown-editor`

### Features

 - Entirely customizable. Modify CSS easily with props, or add custom classes and modify CSS with stylesheets. Define which buttons are visible.
 - The only package dependencies are `react` and `lodash`, minimizing risk.



### Usage

In your code:

ES6:
```javascript
import {SimpleMarkdownEditor} from 'react-simple-markdown-editor';
```

Non-ES6:
```javascript
var SimpleMarkdownEditor = require('react-simple-markdown-editor');
```

In your React `render()` function:

`<SimpleMarkdownEditor textAreaID={"myTextAreaElement"} />`

### Rendering Markdown
Use another library like [react-remarkable](https://github.com/acdlite/react-remarkable) in combination with this. Then set the `source` of the remarkable component to the value of your TextArea element.

### API
Props:
```javascript
SimpleMarkdownEditor.propTypes = {
    // Required props
    textAreaID: PropTypes.string.isRequired,

    // Optional props
    styles: PropTypes.object,
    containerClass: PropTypes.string,
    buttonClass: PropTypes.string,
    enabledButtons: PropTypes.object
};
```
`textAreaID` (String, Required): The ID of the TextArea element you want the editor attached to. When you press buttons in this widget, the text in this TextArea will be modified.

`styles`: (Object, optional): Used to overwrite inline CSS without using your own stylesheets.

Existing properties:    

```javascript
container: {
            
},
button: {
    fontFamily: 'Georgia, serif',
    backgroundColor: '#333536',
    color: 'white',
    marginRight: '5px',
    float: 'left',
    width: '25px',
    borderRadius: '4px',
    textAlign: 'center',
    cursor: 'pointer'
}
```

For instance, if you want to add a border to each button:
`<SimpleMarkdownEditor styles={{button: {border: '1px solid green'}}} />`

`containerClass` and `buttonClass` (String, optional): Provide classes to the container and button elements, so you can overwrite them using your own CSS stylesheets. An alternative to setting the `styles` prop.

`enabledButtons`: (Object, optional): Hide any buttons you don't want to show. All of them default to showing. Buttons:

```javascript
{
    bold: true,
    italic: true,
    strike: true,
    code: true,
    quote: true,
    h1: true,
    h2: true,
    h3: true,
    bullet: true,
    link: true,
    image: true
}
```
For instance, if you want to hide the link button:
`<SimpleMarkdownEditor enabledButtons={{link: false}} />`

### License
MIT, use for free. If you like this, give it a star.
