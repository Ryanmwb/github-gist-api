import React, { useState } from "react";
import { Button, Empty, List, Modal, PageHeader } from "antd";
import { get } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
// styles
import "antd/dist/antd.min.css";

export default function Navbar({ favorites, gists }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const avatar = get(gists, "[0].owner.avatar_url", "");

  let title = "Search";
  if (pathname.search(/gists/) !== -1) {
    title = "Gists";
  } else if (pathname.search(/gist/) !== -1) {
    title = "Gist";
  }

  return (
    <>
      <PageHeader
        avatar={avatar && { src: avatar }}
        className="site-page-header-responsive"
        title={title}
        onBack={() => navigate(-1)}
        extra={[
          <Button key="home" onClick={() => navigate("/")}>
            Search
          </Button>,
          <Button
            key="favorites"
            type="primary"
            onClick={() => setIsFavoritesOpen(true)}
          >
            Favorites
          </Button>,
        ]}
      />
      <Modal
        title="Favorite Gists"
        visible={isFavoritesOpen}
        onCancel={() => setIsFavoritesOpen(false)}
        onOk={() => setIsFavoritesOpen(false)}
      >
        {favorites.length ? (
          <List>
            {favorites.map((favoriteRow) => {
              const favorite = JSON.parse(favoriteRow.gist_obj);
              return (
                <List.Item key={favoriteRow.gist_id}>
                  <div>
                    <div>owner: {get(favorite, "owner.login")}</div>
                    <div>description: {favorite.description}</div>
                    <Button type="link" href={`/gist/${get(favorite, "id")}`}>
                      View
                    </Button>
                  </div>
                </List.Item>
              );
            })}
          </List>
        ) : (
          <Empty description="No favorites" />
        )}
      </Modal>
    </>
  );
}
