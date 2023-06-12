export default function Pills(props) {
  const id = "CSR2";
  return (
    <>
      <div className="tw-rounded-full tw-bg-[#eeeeee] tw-h-[33px] tw-px-[16px] tw-py-[9px] tw-inline-block tw-align-middle tw-leading-none tw-mr-5 tw-w-auto tw-items-center tw-justify-center">
        {props.label}
      </div>
    </>
  );
}
