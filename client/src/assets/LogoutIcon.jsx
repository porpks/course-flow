import React from "react";

function LogoutIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13 15.9998V16.9998C13 17.7954 12.6839 18.5585 12.1213 19.1211C11.5587 19.6837 10.7956 19.9998 10 19.9998H6C5.20435 19.9998 4.44129 19.6837 3.87868 19.1211C3.31607 18.5585 3 17.7954 3 16.9998V6.99976C3 6.20411 3.31607 5.44104 3.87868 4.87844C4.44129 4.31583 5.20435 3.99976 6 3.99976H10C10.7956 3.99976 11.5587 4.31583 12.1213 4.87844C12.6839 5.44104 13 6.20411 13 6.99976V7.99976M17 15.9998L21 11.9998L17 15.9998ZM21 11.9998L17 7.99976L21 11.9998ZM21 11.9998H7H21Z"
        stroke={props.stroke || "black"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default LogoutIcon;
