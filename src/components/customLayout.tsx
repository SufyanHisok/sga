"use client";
import { useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  TextField,
  Menu,
  Button,
  MenuItem,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  Home,
  Person,
  Settings,
  ChevronRight,
  AccountCircle,
  Search,
  EventNote,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  width: `calc(100% - 65px)`,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? { ...openedMixin(theme), "& .MuiDrawer-paper": openedMixin(theme) }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar
        sx={{ background: "#fff", boxShadow: "none" }}
        position="fixed"
        open={open}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
              width: "250px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#ccc",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976D2",
                },
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                    <InputAdornment position="end">
                      <Search sx={{ color: "#666" }} /> {/* 🔥 Search Icon */}
                    </InputAdornment>
                  ),
              } 
              }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              onClick={handleMenuOpen}
              variant="text"
              sx={{ textTransform: "none", color: "#000", fontSize: 16 }}
              endIcon={<AccountCircle />}
            >
              Sufyan Ahmed
            </Button>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer variant="permanent" open={open}>
        <Box
          sx={{
            backgroundColor: "#0f0f2d",
            display: "flex",
            justifyContent: "space-between",
            height: 150,
            alignItems: "center",
            gap: open ? "16px" : "8px",
            padding: open ? "8px" : "4px",
          }}
        >
          <Box>
            <Typography className="text-white" variant="h6">{open ? (
            <>
              <span className="text-white me-0.5">Smart</span>
              <span className="text-green-500">Grocery</span>
            </>
            ) : (
              <>
              <span className="text-white">S</span>
              <span className="text-green-500">G</span>
            </>
            )}
            </Typography>
            
            {open && (
               <div  className="text-gray-300 text-sm">
               Eat Healthy live healthy
             </div>
            )}
           
          </Box>

          <IconButton
            className="!text-white"
            color="inherit"
            onClick={() => setOpen(!open)}
            edge="start"
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        <Divider />
        
        <Box sx={{marginTop: 2}}>

        
        <div className="text-sm text-gray-400 px-6">
          {open ? "Menu" : "M"}
        </div>
        {/* Navigation List */}
        <List>
          {[
            { text: "Dashboard", icon: <Home />, link: "/modules/main" },
            { text: "Planner", icon: <EventNote />, link: "/modules/planner" },
            { text: "Orders", icon: <Person />, link: "/modules/order" },
            // { text: "Invoices", icon: <Person />, link: "/clients" },
            { text: "Settings", icon: <Settings />, link: "/settings" },
          ].map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <Link href={item.link} passHref>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    bgcolor:
                      pathname === item.link
                        ? "rgba(255, 255, 255, 0.1)"
                        : "inherit",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0, ml: open ? 2 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content with Smooth Transition */}
      <MainContent sx={{ marginTop: 8 }} open={open}>
        {children}
      </MainContent>
    </Box>
  );
};

export default CustomLayout;
