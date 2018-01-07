import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace';
import 'brace/mode/javascript';
import 'brace/mode/ruby';
import 'brace/mode/elixir';
import 'brace/theme/solarized_dark';
import languages from '../config/languages';

const selectionBlockStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

class Editor extends Component {
  static propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    lang: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    allowCopy: PropTypes.bool,
  }

  static defaultProps = {
    value: '',
    editable: false,
    onChange: null,
    lang: _.values(languages)[0],
    allowCopy: true,
  }

  render() {
    const {
      value,
      name,
      editable,
      lang,
      onChange,
      allowCopy,
    } = this.props;
    const syntax = languages[lang];

    return (
      <div style={{ position: 'relative' }}>
        <AceEditor
          mode={syntax}
          theme="solarized_dark"
          onChange={onChange}
          name={name}
          value={value}
          readOnly={!editable}
          wrapLines
          editorProps={{ $blockScrolling: true }}
          width="auto"
          fontSize={16}
          showPrintMargin={false}
        />
        { // TODO: write component that wraps editor and prevents onCopy event
        allowCopy ? null : (
          <div style={selectionBlockStyle} />
        )}
      </div>
    );
  }
}

export default Editor;
