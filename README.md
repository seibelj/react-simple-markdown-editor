## Simple React Markdown Editor ##
This makes it easy to add a simple markdown editing widget to any TextArea element.
![example](https://raw.githubusercontent.com/seibelj/react-simple-markdown-editor/master/doc/pic.png)

### Demo
moo

### Customizable
Modify CSS easily with props, or add custom classes and modify CSS easily with stylesheets. You can also customize which buttons are shown.

### Usage
`<SimpleMarkdownEditor textAreaID={"myTextAreaElement"} />`

### API
Props:
```
SimpleMarkdownEditor.propTypes = {
    // Required props
    textAreaID: PropTypes.string.isRequired,

    // Optional props
    styles: PropTypes.object,
    containerClass: PropTypes.string,
    buttonClass: PropTypes.string,
    enableBold: PropTypes.bool,
    enableItalic: PropTypes.bool,
    enableH1: PropTypes.bool,
    enableH2: PropTypes.bool,
    enableH3: PropTypes.bool,
    enableBullet: PropTypes.bool,
    enableLink: PropTypes.bool
};
```
`textAreaID` (String, Required): The ID of the TextArea element you want the editor attached to. When you press buttons in this widget, the text in this TextArea will be modified.

`styles`: (Object, optional): Used to overwrite inline CSS without using your own stylesheets. Existing properties:    

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

`containerClass` and `buttonClass` (String, optional): Provide classes to the container and button elements, so you can overwrite them using your own CSS. An alternative to passing the `styles` props.

`enableBold`, `enableItalic`, etc. (Boolean, optional): Hide any buttons you don't want to show. All of them default to showing.

### License
MIT, use for free. If you like this, give it a star.