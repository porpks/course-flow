function ExistIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox='0 0 21 21'
      fill='none'>
      <path
        d='M5.17773 15.5295L15.5307 5.17651M5.17773 5.17651L15.5307 15.5295'
        stroke={props.stroke || "black"}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default ExistIcon;
