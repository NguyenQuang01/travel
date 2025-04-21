export const getStyleColor = (name: string): string => {
    switch (name) {
      case "Adventure":
        return "#409837";
      case "Bay cruises":
        return "#024c93";
      case "Private":
        return "#ff7f8d";
      case "Seat in coach":
        return "#d94354";
      case "Self guided":
        return "#fa9216";
      case "Small group":
        return "#56c5e6";
      default:
        return "#56c5e6";
    }
  };