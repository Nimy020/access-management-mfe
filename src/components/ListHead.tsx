import React from 'react';

const ListHead = ({ children }): JSX.Element => {
  return (
    <div className='tw-border-b tw-pt-4 tw-pb-4'>
      <div className='tw-flex tw-justify-between tw-items-start'>
        {children}
      </div>
    </div>
  );
};
export default ListHead;
