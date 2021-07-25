import { Button, styled } from "@material-ui/core";
import { blue, pink } from "@material-ui/core/colors";

const StyledButton = styled(Button)({

    backgroundSize: "180%",
    background: `linear-gradient(-45deg, ${blue[800]} 30%, ${pink[600]} 90%)`,
    boxShadow: `0 0 0 black`,
    backgroundPositionX: 0,
    fontWeight: 600,
    letterSpacing: 2,
    color: "white",

    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: `0 2px 8px black`,
      backgroundPositionX: "100%",
    },
});

const CustomButton = (props:any) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default CustomButton;
