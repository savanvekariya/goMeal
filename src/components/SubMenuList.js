import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function SubMenuList({ val }) {
  console.log("SubMenuList", val);
  return (
    <div>
      {val.length !== 0 &&
        val.map((element, i) => {
          return (
            <List
              key={i}
              sx={{
                width: "100%",
                maxWidth: 1500,
                bgcolor: "background.paper",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={element.name}
                  secondary={
                    <React.Fragment>{element.description}</React.Fragment>
                  }
                />
              </ListItem>
              {val.length - 1 == i ? null : (
                <Divider variant="inset" component="li" />
              )}
            </List>
          );
        })}
    </div>
  );
}
/*<ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>*/
