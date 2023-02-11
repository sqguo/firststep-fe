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
import {ThemeProvider} from "@mui/material/styles";
import "./homepage.scss";
import theme from "../../common/styles/theme";
import moment from "moment";
import {useSelector} from "react-redux";

interface Props {
}

const Homepage: FunctionComponent<Props> = () => {
    return (
        <div className="homepage">
            <LandingFrame/>
        </div>

    );
};

export default Homepage;

function LandingFrameMessage() {

    const [open, setOpen] = useState(false);

    const userProfile: UserProfile = useSelector(
        (state: AppState) => state.currentUser?.profile as UserProfile
    );
    const needsOnboarding =
        userProfile?.bio == null ||
        userProfile?.classYear == null ||
        userProfile?.program == null;

    const handleClose = () => setOpen(false)
    let currentTime = moment();

    let nextMatchMinuteDelta;
    // before reset today
    if (currentTime.utc().hour() < 17) {
        nextMatchMinuteDelta = moment().utc().set('hour', 17).set('minutes', 0).diff(currentTime, 'minutes');
    } else {
        // after reset today
        nextMatchMinuteDelta = moment().utc().add(1, 'day').set('hour', 17).set('minutes', 0).diff(currentTime, 'minutes');
    }

    const hours = Math.floor(nextMatchMinuteDelta / 60);
    const minutes = nextMatchMinuteDelta % 60;

    const nextRoundContent = <>
        Wait for a match... Next round begins in {" "}
        <strong>{hours} {hours == 1 ? "hour" : "hours"}</strong> and {" "}
        <strong>{minutes} {minutes == 1 ? "minute" : "minutes"}</strong>.</>;

    const welcomeContent = <>
        Welcome to FirstStep! You are logged in as <strong>{userProfile?.firstName} {userProfile?.lastName}</strong>.
    </>

    return <Box display="flex" flexDirection="row" px={10} flexWrap="wrap" alignItems="center" height={0.8}>

        <Box flex-direction="column" flex={1}>
            <Typography variant="h1" sx={{fontWeight: 400}}>
                FirstStep
            </Typography>

            <ThemeProvider theme={theme}>
                <Button variant="contained" size="large" className="homepage__button" onClick={() => setOpen(true)}>
                    About Us
                </Button>
            </ThemeProvider>
        </Box>

        <Box flex-direction="row" flex={1}>
            {!userProfile ? <>
                <InfoCard content="Sign up and indicate your skills and preferences for the project."/>
                <InfoCard content={nextRoundContent}/>
                <InfoCard content="Talk to your new FYDP team! It's that simple."></InfoCard>
            </> : <>
                <InfoCard content={welcomeContent}/>
                <InfoCard content={nextRoundContent}></InfoCard>
                {needsOnboarding && <InfoCard content={
                            <>
                                Looks like you haven't completed your profile yet.
                                <ThemeProvider theme={theme}>
                                    <Box mt={1}>
                                        <Button component={Link} to="/onboarding/profile" variant="contained" size="large" className="homepage__button">
                                            Complete Onboarding
                                        </Button>
                                    </Box>
                                </ThemeProvider>
                            </>
                        }
                    />
                }
            </>
            }
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
            <LandingFrameMessage/>
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
