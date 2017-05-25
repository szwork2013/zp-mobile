import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description CardHeader
 **/
class CardHeader extends React.Component {
  render() {
    const tilte = this.props.title;
    const extra = this.props.extra;
    const ctrl = this.props.ctrl;
    const active = this.props.active;

    return (
      <div className="zp-card-header" onClick={this.props.onCtrlClick} >
        <div className="card-title">{tilte}<span className="card-extra">{extra}</span></div>
        {ctrl && <div className={`card-ctrl ${active ? 'active' : ''}`} />}
      </div>
    );
  }
}

CardHeader.propTypes = {
  title: React.PropTypes.any,
  extra: React.PropTypes.any,
  ctrl: React.PropTypes.bool,
  active: React.PropTypes.bool,
  onCtrlClick: React.PropTypes.func
};

CardHeader.defaultProps = {
  title: null,
  extra: null,
  ctrl: false,
  active: true,
  onCtrlClick: () => {}
};

export default CSSModules(CardHeader, styles);
