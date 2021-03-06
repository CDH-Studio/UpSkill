import PropTypes from "prop-types";
import SideNavView from "./SideNavView";

const SideNav = ({ sideBarContent, displaySideBar, loading }) => (
  <SideNavView
    sideBarContent={sideBarContent}
    displaySideBar={displaySideBar}
    loading={loading}
  />
);

SideNav.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SideNav;
