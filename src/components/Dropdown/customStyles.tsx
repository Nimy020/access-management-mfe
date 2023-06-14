const customStyles = {
  textBox: {
    base: "tw-peer tw-h-11 tw-pt-5 tw-pb-1.5 tw-px-3 tw-border tw-outline-none tw-rounded-4 tw-text-sm tw-text-black  tw-w-full tw-bg-white ",

    error: " tw-border-red  focus:tw-border-red",

    success: " tw-border-gray focus:tw-border-black ",

    icon: "tw-absolute tw-right-4 tw-top-1/2 tw-transform -tw-translate-y-1/2",

    label: {
      base: "tw-absolute tw-left-3.5 tw-top-1  tw-pointer-events-none tw-transition tw-ease-in tw-delay-200 tw-text-xs peer-placeholder-shown:tw-top-3.5 peer-placeholder-shown:tw-text-sm peer-focus:tw-pointer-events-none peer-focus:tw-top-1 peer-focus:tw-transition peer-focus:tw-ease-in peer-focus:tw-delay-200 peer-focus:tw-text-xs",

      error: " tw-text-red",

      success: "tw-text-gray-2",

      errorIcon: "tw-absolute tw-right-2 tw-top-3",

      errorText: "tw-text-red tw-text-xs",

      tooltipIcon: "tw-absolute tw-right-2 tw-top-3",
    },
  },

  dropdown: {
    labelClass:
      "tw-absolute tw-left-3.5 tw-top-2 peer-focus:tw-top-1 peer-focus:tw-text-xs",

    optionsList:
      "tw-py-[11px]  hover:tw-bg-hoverBlue tw-text-sm tw-pl-2 tw-flex tw-justify-between tw-items-center tw-pr-[5px]",

    labelParent: "tw-relative",

    optionListParent:
      "options-list tw-cursor-pointer tw-border tw-border-gray tw-rounded-4 tw-overflow-y-auto tw-absolute tw-z-10 tw-bg-white tw-w-full  tw-py-2 ",

    selectInputToggle:
      "tw-absolute tw-right-[13px] tw-top-[18px] tw-cursor-pointer",

    outlineBorder: " tw-border-gray",

    typingBold: "tw-font-bold",
  },
};

export default customStyles;
