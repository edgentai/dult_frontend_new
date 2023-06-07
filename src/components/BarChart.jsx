import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";
import axios from "axios";
// import Get_Api_Data from "../scenes/dashboard/index";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // console.log("mock data", data)

  const [api_data, setdata] = useState({});

  useEffect(() => {
    
	getData();
  }, []);

	function getData() {
		console.log('abs');
		axios
		  .post("https://jw1so5sptg.execute-api.us-east-1.amazonaws.com/beta")
		  .then((response) => {
			// console.log(JSON.parse(response.data.body));
			return setdata( JSON.parse(response.data.body));
		  })
		  .catch((error) => console.log(error));
	  }
  // console.log("api_data",api_data)
  // const req = api_data["message"]
  // console.log("api_data",req)

  const req_data = [
    {"country" : 'Crew Behaviors', "count" : api_data?.message?.super['Crew Behaviors']??0},
    {"country" : 'PASS/Reserved Seat Issue', "count" : api_data?.message?.super["PASS/Reserved Seat Issue"]??0},
    {"country" : 'Ticket Related Issue', "count" : api_data?.message?.super["Ticket Related Issue"]??0},
    {"country" : 'Vehicle Related Issue', "count" : api_data?.message?.super["Vehicle Related Issue"]??0},
    {"country" : 'Route', "count" : api_data?.message?.super["Route"]??0},
    {"country" : 'Facility Issue', "count" : api_data?.message?.super["Facility Issue"]??0},
    {"country" : 'Website/App Related Issue', "count" : api_data?.message?.super["Website/App Related Issue"]??0},
  ]
  // const req = api_data["message"]
  console.log("api_data",req_data)
  // const req_data = [
  //   {"country" : 'Crew Behaviors', "count" : req["super"]["Crew Behaviors"]},
  //   {"country" : 'PASS/Reserved Seat Issue', "count" : req["super"]["PASS/Reserved Seat Issue"]},
  //   {"country" : 'Ticket Related Issue', "count" : req["super"]["Ticket Related Issue"]},
  //   {"country" : 'Vehicle Related Issue', "count" : req["super"]["Vehicle Related Issue"]},
  //   {"country" : 'Route', "count" : req["super"]["Route"]},
  //   {"country" : 'Facility Issue', "count" : req["super"]["Facility Issue"]},
  //   {"country" : 'Website/App Related Issue', "count" : req["super"]["Website/App Related Issue"]},
  // ]
  // console.log("api_data",req_data)
  // data = [
  //   {"country" : 'Crew Behaviors', "hot dog" : req["Crew Behaviors"]}
  // ]

  return (
    
    <ResponsiveBar
      data={req_data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["count"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 40,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -10,
        legend: isDashboard ? undefined : "Grievance Class", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Count", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;

