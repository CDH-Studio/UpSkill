import React from "react";
import { Row, Col, Avatar, List } from "antd";
import { BankOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

function EducationView({ educationInfo }) {
  /* Component Styles */
  const styles = {
    card: {
      height: "100%",
    },
    avatar: {
      backgroundColor: "#007471",
    },
  };

  const generateEducationInfoList = (dataSource) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item extra={item.duration}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={styles.avatar}
                  size="large"
                  icon={<BankOutlined />}
                  shape="square"
                />
              }
              title={item.diploma}
              description={item.school}
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <Row>
      <Col xs={24} lg={24}>
        {generateEducationInfoList(educationInfo)}
      </Col>
    </Row>
  );
}

EducationView.propTypes = {
  educationInfo: PropTypes.arrayOf(
    PropTypes.shape({
      diploma: PropTypes.string,
      school: PropTypes.string,
      duration: PropTypes.string,
    })
  ).isRequired,
};

export default EducationView;
