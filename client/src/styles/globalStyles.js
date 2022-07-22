import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
  box-sizing: border-box;
}

body {
  margin: 0;
  padding:0;
  // overflow-x: hidden;
  // width:100vw;
  // height:100vh;
  font-family: "Syncopate", sans-serif ;
  // font-family: "Raleway", sans-serif; 
}

*, *::before,*::after, h1,h2,h3,h4,h5{
    margin:0;
    padding:0
}

h1,h2,h3,h4,h5{
  display: inline-block
}

`

export const LightTheme = {

  body: '#DA467D',
  text: '#26F7FD',
  default:'#10016D',
  main: '#FEAD01', // yellow
  variable: '#1F6357',
  regular: "#FEAD01",
  fallback: "#FEAD01",
  grey: '#968A84',
  green: '#1F6357',


}


export const DarkTheme = {
  body: "#1B2431",
  text: "#26F7FD",
  default:'#728639',
  main: '#FEAD01',
  variable: '#C3909B',
  regular: '#F19E8E',
  fallback: "#FEAD01",
  grey: '#7D7F7B',
}


  // 6C3461 968A84 1F6357 F10C45 9900FA 08787F 1E488F 3F012C






// import "@fontsource/syncopate"
// body { font-family: "Syncopate", sans-serif; }

// import "@fontsource/noto-serif-jp"
// body { font-family: "Noto Serif JP", serif; }

// import "@fontsource/raleway"
// body { font-family: "Raleway", sans-serif; }



// body: "#D9ECF0", //default




//   grape: '#FD5956',// grape //
//   grapy: '#6C3461', //grape
//   brown: "#CC6743", //BROWN //*
//   burntsienna: '#B04E0F',

// //   //text & body
//   darkgrey: '#968A84',
//   goosygrey: '#7D7F7B',
//   green: '#1F6357',
//   greenblue: '#42B395', //
//   teagreen: '#BDF8A3', //
//   pink: '#C3909B', //
//   pinkishred: '#F10C45', // text
//   purple: '#9900FA',
//   dodgerblue: '#3E82FC', //
//   deepaqua: '#08787F',
//   neonblue: '#04D9FF', //
//   lilac: '#EDC8FF', //
//   blockydark: '#1B2431', // blocky dark
//   peacockblue: '#016795',
//   cobalt: '#1E488F', // cobalt


// //   //text
//   text: "#10016D",
//   yellow: "#FEAD01",
//   khaki: '#728639',
//   mint: '#E6DAA6',
//   brush: '#F19E8E',
//   teal: "#3F012C",
// }










