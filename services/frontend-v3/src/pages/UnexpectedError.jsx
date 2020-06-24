import React, { useState } from "react";
import { Button, List, Result, Space } from "antd";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

const UnexpectedError = () => {
  const [showError, setShowError] = useState(false);
  const errors = useSelector((state) => state.errors);

  const history = useHistory();

  const styles = {
    content: { textAlign: "left", maxWidth: "1200px", margin: "0px" },
    errorTitle: {},
    errorDescription: { marginBottom: "0.0em", marginLeft: "1em" },
  };

  return (
    <Result
      title={<FormattedMessage id="error.redirect.title" />}
      subTitle={<FormattedMessage id="error.redirect.subtitle" />}
      status={500}
      extra={
        <div style={{ textAlign: "center" }}>
          <div>
            <Space size="small">
              <Button type="primary" onClick={() => history.goBack()}>
                <FormattedMessage id="error.retry" />
              </Button>
              <Button onClick={() => history.push("/")}>
                <FormattedMessage id="back.to.landing" />
              </Button>
              <Button onClick={() => setShowError((oldValue) => !oldValue)}>
                <FormattedMessage
                  id={showError ? "error.hide" : "error.show"}
                />
              </Button>
            </Space>
          </div>
          <div style={{ display: "inline-block", textAlign: "left" }}>
            <div style={styles.content}>
              {showError ? (
                <List
                  dataSource={errors}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <span style={styles.errorTitle}>{item.title}</span>
                        }
                        description={item.description.map((val) => (
                          <p style={styles.errorDescription}>{val}</p>
                        ))}
                      />
                    </List.Item>
                  )}
                />
              ) : null}
            </div>
          </div>
        </div>
      }
    />
  );
};

UnexpectedError.propTypes = {};

export default UnexpectedError;