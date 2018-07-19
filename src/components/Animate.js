import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Animate = Page => {
  return props => {
    // console.log('Animate: ', props.history.action);
    return (
      <div className="page">
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={200}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          transitionName={props.history.action === 'PUSH' ? 'SlideIn' : 'SlideOut'}
        >
          <Page {...props} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

export default Animate;
