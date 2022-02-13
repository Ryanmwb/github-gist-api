import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";
import { get } from "lodash";
import { useParams } from "react-router-dom";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
// utils
import { isFavoriteGist, toggleFavorite } from "../../utils";
import { getGistById } from "../../github-api";

// styles
import "antd/dist/antd.min.css";
export default function Gist({ favorites, setFavorites, setError }) {
  const { gistId } = useParams();

  const [gist, setGist] = useState({});
  const { comments, created_at, files, history, owner, updated_at, html_url } =
    gist;

  isFavoriteGist(gistId, favorites);

  useEffect(() => {
    (async function () {
      try {
        const newGist = await getGistById(gistId);
        setGist(newGist);
      } catch (error) {
        setError({ ...error, title: "Get Gist by Id" });
      }
    })();
  }, [gistId]);

  return (
    <Descriptions
      bordered
      extra={[
        <Button
          key="1"
          shape="circle"
          icon={
            isFavoriteGist(gistId, favorites) ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined />
            )
          }
          onClick={() =>
            toggleFavorite({
              gist,
              favorites,
              setFavorites,
            })
          }
        />,
        <Button key="2" target="_blank" type="link" href={html_url}>
          Github Link
        </Button>,
      ]}
    >
      <Descriptions.Item label="Owner">
        <Button target="_blank" type="link" href={get(owner, "html_url")}>
          {get(owner, "login")}
        </Button>
      </Descriptions.Item>
      <Descriptions.Item label="# of Comments">{comments}</Descriptions.Item>
      <Descriptions.Item label="Created at">{created_at}</Descriptions.Item>
      <Descriptions.Item label="Updated at">{updated_at}</Descriptions.Item>
      <Descriptions.Item label="Changes">
        {get(history, "length")}
      </Descriptions.Item>
      <Descriptions.Item label="Files">
        {Object.keys(files || {}).map((fileName) => {
          return (
            <Button
              target="_blank"
              key={fileName}
              type="link"
              href={get(files[fileName], `raw_url`)}
            >
              {fileName}
            </Button>
          );
        })}
      </Descriptions.Item>
    </Descriptions>
  );
}
