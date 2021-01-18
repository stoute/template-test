import * as React from 'react';
import { BsmIframe } from '@bsmp/webcomponents-react';

const IframePage = (props) => {
  const protocol = props.match.params.protocol || 'http';
  return (
    <BsmIframe
      src={protocol + '://' + props.match.params.src}
      fullscreen={true}
      fullscreenMargin={'50px 0 0 0'}
    />
  );
};

export default IframePage;
