import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description ButtonSubmit
 * 表单提交按钮
 **/

class ButtonSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.timeout = null;
    this.state = {
      isLoading: false
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleClick() {
    const isLoading = this.state.isLoading;
    const delay = this.props.delay;

    if (!isLoading) {
      this.setState({
        isLoading: true
      }, () => {
        this.timeout = setTimeout(() => {
          this.setState({
            isLoading: false
          });
          clearTimeout(this.timeout);
        }, delay);

        this.props.onClick();
      });
    }
  }

  render() {
    return (
      <div styleName="button-submit" onClick={this.handleClick}>{this.props.children}</div>
    );
  }
}

ButtonSubmit.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
  delay: React.PropTypes.number
};

ButtonSubmit.defaultProps = {
  onClick: () => {},
  delay: 600
};

export default CSSModules(ButtonSubmit, styles, {
  allowMultiple: true
});
