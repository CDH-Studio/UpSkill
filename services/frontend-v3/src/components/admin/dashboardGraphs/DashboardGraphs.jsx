import React from "react";
import DashboardGraphsView from "./DashboardGraphsView";

/**
 *  DashboardGraphs(props)
 *  Controller for the DashboardGraphsView.
 *  It setups the data (bridge) for rendering the component in the view.
 */
function DashboardGraphs(props) {
  /* only access data for graphes that uses corresponding language on page */
  const changeEnFr = (dataSource) => {
    const locale = localStorage.getItem("lang") || "en";
    const data = dataSource.map((skill) => {
      return {
        name: skill.description[locale],
        count: skill.count,
      };
    });

    return data;
  };

  return (
    <DashboardGraphsView
      topFiveSkills={changeEnFr(props.data.skillCount)}
      topFiveCompetencies={changeEnFr(props.data.compCount)}
      topFiveDevelopmentGoals={changeEnFr(props.data.developCount)}
      monthlyGrowth={props.data.graphicalData}
    />
  );
}

export default DashboardGraphs;