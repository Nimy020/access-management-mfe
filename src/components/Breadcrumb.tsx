import React from 'react';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../assets/leftArrow.svg';

const Breadcrumb = ({ crumbs }) => {
  const navigate = useNavigate();

  return (
    <button
      className='tw-flex tw-gap-2 tw-items-center'
      onClick={() => navigate(crumbs?.to)}
    >
      <img src={leftArrow} alt='' />
      {crumbs?.label}
    </button>
  );
};

export default Breadcrumb;
