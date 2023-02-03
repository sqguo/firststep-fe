import React, {FunctionComponent, useState} from "react";
import {Link} from "react-router-dom"
import {
    Button,
    Avatar,
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    DialogActions
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "./homepage.scss";
import theme from "../../common/styles/theme";
interface Props {}

const Homepage: FunctionComponent<Props> = () => {
  return (
    <div className="homepage">
        <LandingFrame />
    </div>

  );
};

export default Homepage;

function LandingFrameMessage() {

    const [ open, setOpen ] = useState(false);

    const handleClose = () => setOpen(false)

    return <Box display="flex" flexDirection="row" px={10} flexWrap="wrap" alignItems="center" height={0.8}>
        
        <Box flex-direction="column" flex={1}>
            <Typography variant="h1" sx={{ fontWeight: 400 }}>
                FirstStep
            </Typography>

            <ThemeProvider theme={theme}>
                <Button variant="contained" size="large" className="homepage__button" onClick={() => setOpen(true)}>
                    About Us
                </Button>
            </ThemeProvider>
        </Box>

        <Box flex-direction="row" flex={1}>
            <InfoCard content="Sign up and indicate your skills and preferences for the project" />
            <InfoCard content={<>Wait for a match ... Next Round begins in <b>12 hours</b> and <b>45 minutes</b></>}></InfoCard>
            <InfoCard content="Talk to your new FYDP team! It's that simple."></InfoCard>
        </Box>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>About Us</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" flexWrap="wrap">
                    <span>Project created by FYDP Group 58</span>
                    <span>For more inquiries, please contact support@uwfs.live</span>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button href="mailto:support@uwfs.live">Send Email</Button>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>

    </Box>
}
function LandingFrame() {
    return (<div className="homepage__bg-image">
        <LandingFrameMessage />
    </div>
    );
}

interface InfoCardProps {
    content: any;
}

const InfoCard: FunctionComponent<InfoCardProps> = ({content, ...props}) => {
    return (
        <Box sx={{
            background: "#ffffff none repeat scroll 0 0",
            borderColor: "#808080",
            borderStyle: "inset",
            borderWidth: "0px 0px 0px 15px",
            color: "black",
            fontSize: 20,
            borderRadius: "5px",
            width: 0.8,
        }} p={3} my={1}>
            {content}
        </Box>
    )
}
