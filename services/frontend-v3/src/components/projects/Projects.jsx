import React, { Component } from "react";
import ProjectsView from "./ProjectsView";

class Projects extends Component {
  render() {
    const { data } = this.props;

    return (
      <ProjectsView
        data={data}
        avatar={{
          acr: data.acronym,
          color: data.color
        }}
        locale={localStorage.getItem("lang")}
      />
    );
  }
}

export default Projects;