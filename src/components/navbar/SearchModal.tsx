import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";

export default function SearchModal() {
  const [openSearch, setOpenSearch] = useState(false);
  console.log("search box", openSearch);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <IconButton component="label" onClick={() => setOpenSearch(true)}>
        <SearchIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={openSearch}>
          <Box sx={style}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
            </Search>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, velit sunt! Nemo
              velit accusantium ullam atque minima? Impedit quae, quibusdam veniam voluptas nostrum
              laudantium reiciendis velit laborum possimus neque saepe.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1
};
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  //   marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    width: "auto"
  }
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));
