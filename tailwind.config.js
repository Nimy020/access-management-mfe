const tailwindConfig = require("@sephora-csc/csc-tailwind-config/tailwind.config");
module.exports = {
  ...tailwindConfig,
  content: [
    "./src/**/*.{html,js,tsx,ts}",
    "./node_modules/@sephora-csc/csc-component-library/**/*.{html,js,tsx,ts}",
  ],
};

// /** @type {import('tailwindcss').Config} */

// module.exports = {
//   prefix: "tw-",
//   theme: {
//     screens: {
//       "tw-sm": "40rem", //640

//       "tw-md": "49.375rem", //790

//       "tw-lg": "64rem", //1024

//       "tw-xl": "90rem", //1440

//       "tw-2xl": "100rem", //1600

//       "tw-3xl": "120rem", //1920
//     },
//     extend: {
//       colors: {
//         current: "currentColor",
//         black: {
//           DEFAULT: "#000000", // primary
//           2: "#000000", // secondary
//           3: "#000000", // secondary
//         },
//         white: {
//           DEFAULT: "#FFFFFF", // primary
//           2: "#F6F6F8", // secondary
//         },
//         gray: {
//           DEFAULT: "#CCCCCC",
//           2: "#666666",
//           3: "#F6F6F8",
//           4: "#EEEEEE",
//         },
//         red: {
//           DEFAULT: "#CF112C",
//         },
//         link: {
//           DEFAULT: "#136BEA",
//         },
//         transparent: "transparent",
//         success: "#008048",
//         inactive: "#F6F6F8",
//         inactiveTextColor: "#666666",
//         suspended: "#EB7100",
//         banned: "#CF112C",
//         fraud: "#000000",
//         hoverBlue: "#E5F2FD",
//       },
//       fontFamily: {
//         sans: ["Helvetica Neue"],
//       },
//       fontSize: {
//         xs: ["0.75rem", "0.875rem"], //["12px", "14px"],
//         sm: ["0.875rem", "1.125rem"], //["14px", "18px"]
//         base: ["1rem", "1.25rem"], //["16px", "20px"]
//         lg: ["1.25rem", "1.375rem"], //["20px", "22px"]
//         xl: ["1.5rem", "1.625rem"], //["24px", "26px"]
//       },
//       borderRadius: {
//         none: "0",
//         4: "0.25rem", //4px
//         22: "1.375rem", //22px
//       },
//       spacing: {
//         13: "0.813rem", //13px
//       },
//     },
//   },
//   content: [
//     "./src/**/*.{html,js,tsx,ts}",
//     "./node_modules/@sephora-csc/csc-component-library/**/*.{html,js,tsx,ts}",
//   ],
// };
