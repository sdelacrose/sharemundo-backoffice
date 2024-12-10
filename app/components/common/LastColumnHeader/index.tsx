import React from 'react';

const LastColumnHeader = (props) => {
  return (
    <div
      style={{
        justifyContent: 'start',
        textAlign: 'left',
        paddingLeft: '12px',
      }}
    >
      {props.displayName}
    </div>
  );
};

export default LastColumnHeader;
