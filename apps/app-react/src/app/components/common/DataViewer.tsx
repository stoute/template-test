import * as React from 'react';
import { BsmCollapsible, BsmJsonViewer } from '@bsmp/webcomponents-react';

type props = {
  data?: unknown;
  collapsed?: boolean;
  label?: string
}

const DataViewer = ({ data, collapsed, label }: props) => {
  return (
    <div>
      <BsmCollapsible label={label || 'data'} collapsed={collapsed || true}>
        <BsmJsonViewer
          data-json={JSON.stringify(data || {})}
          collapseAt={1}
        ></BsmJsonViewer>
      </BsmCollapsible>
    </div>
  );
};

export default DataViewer;
