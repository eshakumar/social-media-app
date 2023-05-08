import { Box } from "@mui/material";
import { styled } from "@mui/system";

// a styled component (so you can reuse css properties for lots of different components)
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})

export default FlexBetween;