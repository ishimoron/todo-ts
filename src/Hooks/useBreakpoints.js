import { useTheme, useMediaQuery } from "@mui/material";

const useBreakpoints = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  return { isMobile, isDesktop, isTablet, isLarge };
};

export default useBreakpoints;
