import React, { PropTypes } from 'react';
import {merge} from 'lodash';

class SimpleMarkdownEditor extends React.Component {

    wrapText(symbol, endSymbol, insertAfter) {

        if (!endSymbol) {
            endSymbol = symbol;
        }

        let elem = document.getElementById(this.props.textAreaID),
            start = elem.selectionStart,
            end = elem.selectionEnd,
            text = elem.value;

        let afterText = insertAfter ? insertAfter : '';

        elem.value = text.substring(0, start) + symbol + text.substring(start, end) + endSymbol + afterText + text.substring(end, text.length);
        elem.focus();
        elem.setSelectionRange(start + symbol.length, end + endSymbol.length);
    }

    insertBold() {
        this.wrapText('**');
    }

    insertItalics() {
        this.wrapText('_');
    }

    insertStrike() {
        this.wrapText('~~');
    }

    insertCode() {
        this.wrapText('`');
    }

    insertAtBeginningOfLine(symbol) {
        let elem = document.getElementById(this.props.textAreaID),
            start = elem.selectionStart,
            end = elem.selectionEnd,
            text = elem.value;

        let newLineIndex = text.lastIndexOf('\n', start - 1);
        if (newLineIndex === -1) {
            elem.value = symbol + text;
        }
        else {
            elem.value = text.substring(0, newLineIndex + 1) + symbol + text.substring(newLineIndex + 1, text.length);
        }
        elem.focus();
        elem.setSelectionRange(start + symbol.length, end + symbol.length);
    }

    insertH1() {
        this.insertAtBeginningOfLine('# ');
    }

    insertH2() {
        this.insertAtBeginningOfLine('## ');
    }

    insertH3() {
        this.insertAtBeginningOfLine('### ');
    }

    insertQuote() {
        this.insertAtBeginningOfLine('> ');
    }

    insertBullet() {
        this.insertAtBeginningOfLine('* ');
    }

    insertLink() {
        let elem = document.getElementById(this.props.textAreaID),
            start = elem.selectionStart,
            end = elem.selectionEnd,
            text = elem.value,
            link = "(http://www.mylink.com/)";

        if (start === end) {
            elem.value = text.substring(0, start) + "[Link Text]" + link + text.substring(start, text.length);
            elem.focus();
            elem.setSelectionRange(start, start);
        }
        else {
            this.wrapText('[', ']', link);
        }
    }

    insertImage() {
        let elem = document.getElementById(this.props.textAreaID),
            start = elem.selectionStart,
            end = elem.selectionEnd,
            text = elem.value,
            link = "(http://myhost.com/my_image.jpg)";

        if (start === end) {
            elem.value = text.substring(0, start) + "![Image Description]" + link + text.substring(start, text.length);
            elem.focus();
            elem.setSelectionRange(start, start);
        }
        else {
            this.wrapText('![', ']', link);
        }
    }

    render() {
        
        let styles = merge({}, this.constructor.styles, this.props.styles),
            enabledButtons = merge({}, this.constructor.enabledButtons, this.props.enabledButtons),
            buttonHtmlText = merge({}, this.constructor.buttonHtmlText, this.props.buttonHtmlText),
            additionalProps = merge({}, this.constructor.additionalProps, this.props.additionalProps);

        return (
            <div className={this.props.containerClass} style={styles.container}>
                {enabledButtons.bold &&
                <div {...additionalProps.bold} className={this.props.buttonClass} style={styles.button} onClick={this.insertBold.bind(this)}
                     dangerouslySetInnerHTML={{__html: buttonHtmlText.bold}} />
                }
                {enabledButtons.italic &&
                <div {...additionalProps.italic} className={this.props.buttonClass} style={styles.button} onClick={this.insertItalics.bind(this)}
                     dangerouslySetInnerHTML={{__html: buttonHtmlText.italic}} />
                }
                {enabledButtons.strike &&
                    <div {...additionalProps.strike} className={this.props.buttonClass} style={styles.button} onClick={this.insertStrike.bind(this)}
                         dangerouslySetInnerHTML={{__html: buttonHtmlText.strike}} />
                }
                {enabledButtons.code &&
                    <div {...additionalProps.code} className={this.props.buttonClass} style={styles.button} onClick={this.insertCode.bind(this)}
                         dangerouslySetInnerHTML={{__html: buttonHtmlText.code}} />
                }
                {enabledButtons.quote &&
                    <div {...additionalProps.quote} className={this.props.buttonClass} style={styles.button} onClick={this.insertQuote.bind(this)}
                         dangerouslySetInnerHTML={{__html: buttonHtmlText.quote}} />
                }
                {enabledButtons.h1 &&
                <div {...additionalProps.h1} className={this.props.buttonClass} style={styles.button} onClick={this.insertH1.bind(this)}
                     dangerouslySetInnerHTML={{__html: buttonHtmlText.h1}} />
                }
                {enabledButtons.h2 &&
                <div {...additionalProps.h2} className={this.props.buttonClass} style={styles.button} onClick={this.insertH2.bind(this)}
                     dangerouslySetInnerHTML={{__html: buttonHtmlText.h2}} />
                }
                {enabledButtons.h3 &&
                <div {...additionalProps.h3} className={this.props.buttonClass} style={styles.button} onClick={this.insertH3.bind(this)}
                     dangerouslySetInnerHTML={{__html: buttonHtmlText.h3}} />
                }
                {enabledButtons.bullet &&
                <div {...additionalProps.bullet} className={this.props.buttonClass} style={styles.button} onClick={this.insertBullet.bind(this)}
                     dangerouslySetInnerHTML={{__html: buttonHtmlText.bullet}} />
                }
                {enabledButtons.link &&
                <div {...additionalProps.link} className={this.props.buttonClass} style={styles.button} onClick={this.insertLink.bind(this)}
                     dangerouslySetInnerHTML={{__html: buttonHtmlText.link}} />
                }
                {enabledButtons.image &&
                <div {...additionalProps.image} className={this.props.buttonClass} style={styles.button} onClick={this.insertImage.bind(this)}
                     dangerouslySetInnerHTML={{__html: buttonHtmlText.image}} />
                }

            </div>
        );
    }
}

SimpleMarkdownEditor.styles = {
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
};

SimpleMarkdownEditor.enabledButtons = {
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

SimpleMarkdownEditor.buttonHtmlText = {
    bold: 'B',
    italic: '<i>I</i>',
    strike: '<s>S</s>',
    code: '&lt; &gt;',
    quote: '&ldquo; &rdquo;',
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    bullet: '&#8226;',
    link: '#',
    image: '[i]'
}

SimpleMarkdownEditor.additionalProps = {
    bold: {},
    italic: {},
    strike: {},
    code: {},
    quote: {},
    h1: {},
    h2: {},
    h3: {},
    bullet: {},
    link: {},
    image: {}
}

SimpleMarkdownEditor.propTypes = {
    // Required props
    textAreaID: PropTypes.string.isRequired,

    // Optional props
    styles: PropTypes.object,
    containerClass: PropTypes.string,
    buttonClass: PropTypes.string,
    enabledButtons: PropTypes.object,
    buttonHtmlText: PropTypes.object,
    additionalProps: PropTypes.object
};

exports.SimpleMarkdownEditor = SimpleMarkdownEditor;