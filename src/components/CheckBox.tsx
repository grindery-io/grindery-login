import React from "react";

type Props = {
  checked: boolean;
  onChange: (a: boolean) => void;
  style?: any;
  tabIndex?: number;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

export const CheckBox = (props: Props) => {
  const { checked, onChange, style, tabIndex, onKeyDown } = props;
  return (
    <div
      onClick={() => {
        onChange(!checked);
      }}
      style={{ cursor: "pointer", position: "relative", top: "-1px", ...style }}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {checked ? (
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="2" width="20" height="20" rx="4" fill="#0057FF" />
          <path
            d="M15.5938 6.625L7.375 14.8438L4.375 11.8125C4.21875 11.6875 3.96875 11.6875 3.84375 11.8125L2.9375 12.7188C2.8125 12.8438 2.8125 13.0938 2.9375 13.25L7.125 17.4062C7.28125 17.5625 7.5 17.5625 7.65625 17.4062L17.0312 8.03125C17.1562 7.90625 17.1562 7.65625 17.0312 7.5L16.125 6.625C16 6.46875 15.75 6.46875 15.5938 6.625Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="2.5"
            width="19"
            height="19"
            rx="3.5"
            fill="white"
            stroke="#979797"
          />
        </svg>
      )}
    </div>
  );
};
