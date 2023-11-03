import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import SubMenuList from "./SubMenuList";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function MenuList() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  let breakfastList = [
    {
      name: "Cheese- Sandwich",
      description:
        "A grilled cheese sandwich is assembled by creating a cheese filling, often cheddar, or American, between two slices of bread, and is then heated until the bread browns and the cheese melts. ",
    },
    {
      name: "Falafel",
      description:
        "A Middle Eastern dish consisting of crushed chickpeas and spicy seasonings and they are served as an appetizer with a sesame-based sauce called tahini, or served in pita bread as a sandwich filler. ",
    },
    {
      name: "Masala Dosa",
      description:
        "Masala dosa is one that is crisp, aromatic, flavourful and has a potato masala or spiced seasoned potatos stuffed in it.",
    },
  ];
  let lunchList = [
    {
      name: "One Pot Rice With Salad",
      description:
        "Healthy rice cooked in mixed vegetables and served with caesar/broccoli salad.",
    },
    {
      name: "Tandoori Roti With Panner Curry",
      description:
        "Paneer curry recipe is a rich and delicious curry made in an onion-tomato-cashew curry base with soft paneer cubes or Indian cottage cheese.It is served with tandoori roti or naan.",
    },
    {
      name: "Rice With Chicken Tikka Masala",
      description:
        "Chicken tikka masala is made in exotic sauses and served hot with jeera rice.",
    },
  ];
  let DinnerList = [
    {
      name: "Panner Chilli Curry With Rice/Roti",
      description:
        "It's a popular Indo-Chinese dish where cubes of fried crispy paneer are tossed in spicy sause and served hot with rice/roti.",
    },
    {
      name: "Mix Veg Korma With Roti",
      description:
        "Assorted vegetables cooked in mild creamy sause with coconut milk and served with rotis.",
    },
    {
      name: "Pav-Bhaji",
      description:
        "Pav bhaji is a spiced mixture of mashed vegetables in a thick gravy served with bread.A soft white bread roll is the usual accompaniment to the curry.",
    },
  ];

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Breakfast</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SubMenuList val={breakfastList} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Lunch</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SubMenuList val={lunchList} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Dinner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SubMenuList val={DinnerList} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
