import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Input, Row } from "antd";

// styles
import "antd/dist/antd.min.css";

const { Search: AntSearch } = Input;

export default function Search() {
  const navigate = useNavigate();

  async function onSearch(username) {
    if (username) navigate(`/${username}/gists`);
  }

  return (
    <Row>
      <Col span={8} offset={8}>
        <AntSearch
          placeholder="Search Github Username"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Col>
    </Row>
  );
}
