export const getCardColor = (eyeColor) => {
  let cardColor;
  switch (eyeColor) {
    case "blue":
      cardColor = "78C1F3";
      break;
    case "brown":
      cardColor = "A4907C";
      break;
    case "black":
      cardColor = "EFFFFB";
      break;
    case "orange":
      cardColor = "FFD6A5";
      break;
    case "hazel":
      cardColor = "DFFFD8";
      break;
    case "yellow":
      cardColor = "FDF7C3";
      break;
    case "blue-gray":
      cardColor = "A0C3D2";
      break;
    case "red":
      cardColor = "FEA1A1";
      break;
    case "pink":
      cardColor = "FDCEDF";
      break;
    default:
      cardColor = "E5E0FF";
  }

  return "#" + cardColor;
};
