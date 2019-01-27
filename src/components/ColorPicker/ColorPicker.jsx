import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import CustomInput from "components/CustomInput/CustomInput.jsx";
class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    hexColor: ""
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.setState({hexColor: color.hex});
    console.log(color);
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '15px',
          height: '15px',
          marginTop: '35px',
          marginRight: '10px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        inlineFlex: {
          display: 'inline-flex',
        }
      },
    });

    return (
      <div>
        <div style={styles.inlineFlex}>
          <div style={ styles.color } onClick={ this.handleClick }/>
          <CustomInput
                id="email_adress2"
                inputProps={{
                    type: "text",
                    value: this.state.hexColor
                }}
                onClick={this.handleClick}
                />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker