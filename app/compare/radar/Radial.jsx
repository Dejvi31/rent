import { ResponsiveRadar } from "@nivo/radar";
import TooltipParams from "./tooltipRadar/TooltipParams";

// To be removed in future releases
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line no-console
  const originalWarn = console.error;
  // eslint-disable-next-line no-console
  console.error = (...args) => {
    if (
      args[0].includes(
        "Support for defaultProps will be removed from function components in a future major release."
      )
    ) {
      return;
    }
    originalWarn(...args);
  };
}

const Radial = ({ data = {}, keys = {}, indexBy = {}, originalData }) => {
  return (
    <ResponsiveRadar
      data={data}
      keys={keys}
      indexBy={indexBy}
      valueFormat=">-.2f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={{ from: "color" }}
      gridLabelOffset={36}
      dotSize={10}
      dotColor="#ffffff"
      dotBorderWidth={2}
      dotBorderColor={{ from: "color", modifiers: [] }}
      colors={{ scheme: "nivo" }}
      blendMode="multiply"
      motionConfig="wobbly"
      animate={false}
      sliceTooltip={(params) => {
        return originalData.map((data, index) => {
          if (params["index"] == "Battery" && index == 3) {
            return <TooltipParams key={index} data={data} />;
          } else if (params["index"] == "RAM" && index == 0) {
            return <TooltipParams key={index} data={data} />;
          } else if (params["index"] == "PPI" && index == 1) {
            return <TooltipParams key={index} data={data} />;
          } else if (params["index"] == "Display" && index == 2) {
            return <TooltipParams key={index} data={data} />;
          }
        });
      }}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Radial;
