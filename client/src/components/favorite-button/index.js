import React, { useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { get } from "lodash";
// components
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
// styles
import "antd/dist/antd.min.css";

export default function FavoriteButton({ gist, isFavorite, setFavorites }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleFavoriteClick = async () => {
    setIsDisabled(true);
    let response;
    if (isFavorite) {
      response = await axios.delete(
        `http://localhost:3010/remove-favorite/${get(gist, "id", "")}`
      );
    } else {
      response = await axios.post("http://localhost:3010/add-favorite", {
        gist,
      });
    }
    setFavorites(get(response, "data.rows", []));
    setIsDisabled(false);
  };
  return (
    <Button
      disabled={isDisabled}
      key="1"
      shape="circle"
      icon={
        isFavorite ? (
          <HeartFilled style={{ color: "red" }} />
        ) : (
          <HeartOutlined />
        )
      }
      onClick={handleFavoriteClick}
    />
  );
}
