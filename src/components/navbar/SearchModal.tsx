import * as React from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2)
  }
}));

const styles = {
  textInput: {
    fontSize: "large"
  },
  searchButton: {
    borderRadius: "10px",
    backgroundColor: "rgb(243 245 245)"
  }
};

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function SearchModal() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numbers = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        color="inherit"
        startIcon={<SearchIcon />}
        style={styles.searchButton}
      >
        <span>Search..{'    '}.</span>

        {/* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; */}
      </Button>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <TextField
          type="search"
          id="search"
          placeholder="Search..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            style: styles.textInput
          }}
        />
        {/* <TextField
          type="search"
          id="search"
          placeholder="Search..."
          inputProps={styles.textInput}
        /> */}
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {numbers.map((val: number, idx: number) => {
            return (
              <React.Fragment key={idx}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Profile Avatar" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Post Title"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque fuga
                          tenetur odio aspernatur mollitia, vitae voluptatibus maiores.
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {idx + 1 !== numbers.length ? <Divider variant="inset" component="li" /> : null}
              </React.Fragment>
            );
          })}
        </List>
      </BootstrapDialog>
    </div>
  );
}
