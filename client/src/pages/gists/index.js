import React, { useEffect } from "react";
import { Button, Descriptions, Empty, List } from "antd";
import { get } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
// utils
import { isFavoriteGist, toggleFavorite } from "../../utils";
import { getGistsByUsername } from "../../github-api";
// styles
import "antd/dist/antd.min.css";

export default function Gists({
  favorites,
  setFavorites,
  gists,
  setGists,
  setError,
}) {
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      if (username)
        try {
          const gists = await getGistsByUsername(username);
          setGists(gists);
          navigate(`/${username}/gists`);
        } catch (error) {
          setError({ ...error, title: "Get Gists By Username" });
        }
    })();
    return () => setGists([]);
  }, []);

  return gists.length === 0 ? (
    <Empty description="No gists" />
  ) : (
    <List
      bordered
      dataSource={gists}
      renderItem={(gist) => {
        const gistId = get(gist, "id", "");
        const isFavorite = isFavoriteGist(gistId, favorites);
        return (
          <List.Item>
            <Descriptions
              extra={
                <div>
                  <Button
                    shape="circle"
                    icon={
                      isFavorite ? (
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
                  />
                  <Button
                    type="link"
                    onClick={() => navigate(`/gist/${gistId}`)}
                  >
                    View
                  </Button>
                </div>
              }
            >
              <Descriptions.Item label="Created at">
                {get(gist, "created_at", "")}
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                {get(gist, "updated_at", "")}
              </Descriptions.Item>
              <Descriptions.Item label="# Comments">
                {get(gist, "comments", "")}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {get(gist, "description", "")}
              </Descriptions.Item>
            </Descriptions>
          </List.Item>
        );
      }}
    />
  );
}
