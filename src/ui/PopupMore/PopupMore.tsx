import React, { useState, useRef } from 'react';
import { useOnClickOutside } from '../../customHooks';
import { PopupMoreInner, CardMore, Settings } from './styles';
import iconMore from '../../assets/images/icons/more.svg';

interface popupMoreInterface {
  className?: string;
  children: React.ReactChild | React.ReactNode;
}

export const PopupMore: React.FC<popupMoreInterface> = ({ children, ...props }) => {
  const rootRef = useRef(null);

  const [popup, togglePopup] = useState(false);
  useOnClickOutside(rootRef, () => togglePopup(false));

  return (
    <div
      className={props.className}
      ref={rootRef}
      onClick={e => e.stopPropagation()}
    >
      <PopupMoreInner>
        <CardMore
          onClick={e => {
            e.stopPropagation();
            togglePopup(!popup);
          }}
        >
          <img src={iconMore} alt="Button more" />
        </CardMore>
        <Settings
          className={popup ? "is-open" : ""}
          onClick={() => togglePopup(!popup)}
        >
          {children}
        </Settings>
      </PopupMoreInner>
    </div>
  )
}
