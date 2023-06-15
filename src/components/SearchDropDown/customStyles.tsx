const customStyles = {
    timePicker: {
      timeRangePicker: {
        wrapper: "tw-px-4",
        innerWrapper: "tw-flex tw-my-4",
        label:
          "tw-mr-2 tw-flex tw-text-sm tw-font-normal tw-h-[44px] tw-items-center tw-justify-start tw-w-full",
      },
      textField: {
        wrapper: "tw-relative tw-flex tw-items-center",
        inputTag: {
          error: "tw-border-red tw-text-red",
          success:
            "tw-border-gray tw-cursor-pointer tw-h-[44px] tw-px-3 tw-font-normal tw-text-sm tw-relative tw-w-[160px] tw-rounded-[4px] tw-border",
        },
        errorIcon: "tw-absolute tw-w-[16px] tw-left-[132px] tw-h-[16px]",
        errorMessage: "tw-text-red tw-text-xs tw-py-1.5",
      },
      dropDown: {
        wrapper:
          "tw-z-40 tw-overflow-hidden tw-hidden tw-absolute tw-flex tw-bg-white tw-drop-shadow-[0_0px_6px_rgba(0,0,0,0.2)] tw-rounded-[4px] tw-h-[204px] tw-w-[160px]",
        hours: {
          wrapper: "tw-overflow-y-auto hour-class tw-border-r",
          selected: "tw-bg-black tw-text-white tw-font-bold tw-text-sm",
          hover: "hover:tw-bg-hoverBlue",
          default: {
            time: "tw-flex tw-items-center tw-justify-center tw-w-[51px] tw-h-[34px] tw-px-[16px] tw-py-[8px] tw-text-sm tw-cursor-default",
            meridian:
              "tw-flex tw-items-center tw-justify-center tw-w-[56px] tw-h-[34px] tw-px-[16px] tw-py-[8px] tw-text-sm tw-cursor-default",
          },
        },
      },
    },
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
    button: {
      base: " tw-w-full  tw-rounded-full tw-text-sm tw-font-bold	tw-text-center tw-py-[0.6875rem] tw-border-2 tw-rounded-22 tw-border-black disabled:tw-bg-gray-4 disabled:tw-text-gray-2 disabled:tw-border-none",
      primary: "tw-text-white tw-bg-black",
      secondary: "tw-text-black tw-bg-white",
    },
    chip: {
      base: "tw-w-full tw-text-xs tw-text-center tw-font-bold tw-px-2 tw-py-px tw-rounded",
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
    filterDropDown: {
      base: "tw-justify-between tw-relative tw-cursor-pointer tw-mr-2",
      singleselectBtn: "tw-inline-flex tw-items-center ",
      multiselectBtn: "tw-inline-flex tw-items-center",
      activeBtn: "tw-bg-black tw-text-white",
      nonActiveBtn:
        "hover:tw-bg-hoverBlue focus-visible:tw-border-[0.0625rem] focus-visible:tw-border-black tw-bg-gray-4 tw-text-black",
      lightgrey_black: "tw-bg-gray-4 tw-text-black",
      hovercolors:
        "hover:tw-bg-hoverBlue focus-visible:tw-border-[0.0625rem] focus-visible:tw-border-black",
      emptyDropdown:
        "tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-py-[45px] tw-px-[34px] tw-rounded-b-[4px] tw-shadow-[0_0_6px_rgba(0,0,0,0.2)]",
      btnShape:
        "tw-text-xs tw-rounded-2xl tw-px-4 tw-py-[0.625rem] tw-whitespace-nowrap",
      dropdown:
        "tw-w-max tw-absolute tw-max-h-[400px] tw-overflow-y-scroll tw-py-2 tw-whitespace-nowrap tw-bg-white tw-text-black tw-rounded-md tw-shadow-[0px_0px_6px_rgba(0,0,0,0.2)] tw-z-20 tw-left-0",
      menuItems:
        "tw-text-sm tw-p-2 tw-items-center tw-justify-left hover:tw-bg-blue-50 tw-cursor-pointer tw-text-start tw-flex",
      margin_z: "tw-ml-2 tw-z-10",
      dropdownParent: "tw-flex tw-justify-between tw-flex-wrap tw-w-max tw-my-4",
      buttonArrow: "tw-w-2 tw-h-4 tw-relative tw-ml-1",
      ml_auto: "tw-ml-auto",
      width_absolute: "tw-46px tw-left-0",
      w_46: "tw-46px",
      alignProperty: "tw-items-center",
      mr_2: "tw-mr-2 ",
      checkbox: {
        wrapper:
          "custom-checkbox tw-rounded tw-w-5 tw-h-5 tw-border-2 tw-p-[2px] tw-shrink-0",
        tick: { wrapper: "tw-checkbox-tick" },
        svg: "tw-w-4 tw-h-4 tw-text-white",
        lineheight: "tw-leading-6",
        selected: "tw-border-black",
        notselected: "tw-border-gray-400",
        general: "tw-flex tw-items-center tw-justify-center tw-mr-2.5",
      },
    },
    filterPills: {
      clearAll:
        "tw-inline-block tw-bg-gray-3 tw-text-xs tw-py-[0.5625rem] tw-ml-2 tw-rounded tw-pl-[0.625rem] tw-pr-3",
      clearAllClose: "tw-h-[0.5625rem] tw-ml-2",
    },
  };
  
  export default customStyles;
  