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
        this.wrapText('*');
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

    render() {
        
        let styles = merge({}, this.constructor.styles, this.props.styles),
            enabledButtons = merge({}, this.constructor.enabledButtons, this.props.enabledButtons);
        return (
            <div className={this.props.containerClass} style={styles.container}>
                {enabledButtons.bold &&
                <div className={this.props.buttonClass} style={styles.button} onClick={this.insertBold.bind(this)}>
                    B
                </div>
                }
                {enabledButtons.italic &&
                <div className={this.props.buttonClass} style={styles.button} onClick={this.insertItalics.bind(this)}>
                    <i>I</i>
                </div>
                }
                {enabledButtons.h1 &&
                <div className={this.props.buttonClass} style={styles.button} onClick={this.insertH1.bind(this)}>
                    H1
                </div>
                }
                {enabledButtons.h2 &&
                <div className={this.props.buttonClass} style={styles.button} onClick={this.insertH2.bind(this)}>
                    H2
                </div>
                }
                {enabledButtons.h3 &&
                <div className={this.props.buttonClass} style={styles.button} onClick={this.insertH3.bind(this)}>
                    H3
                </div>
                }
                {enabledButtons.bullet &&
                <div className={this.props.buttonClass} style={styles.button} onClick={this.insertBullet.bind(this)}>
                    &#8226;
                </div>
                }
                {enabledButtons.link &&
                <div className={this.props.buttonClass} style={styles.button} onClick={this.insertLink.bind(this)}>
                    #
                </div>
                }
                {enabledButtons.image &&
                <div className={this.props.buttonClass} style={styles.button} onClick={this.insertLink.bind(this)}>
                    [img]
                </div>
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
    h1: true,
    h2: true,
    h3: true,
    bullet: true,
    link: true,
    image: true
}

SimpleMarkdownEditor.propTypes = {
    // Required props
    textAreaID: PropTypes.string.isRequired,

    // Optional props
    styles: PropTypes.object,
    containerClass: PropTypes.string,
    buttonClass: PropTypes.string,
    enabledButtons: PropTypes.object
};

exports.SimpleMarkdownEditor = SimpleMarkdownEditor;