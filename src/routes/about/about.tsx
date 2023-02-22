import React, {FunctionComponent} from "react";
import "../homepage/landingPage.scss";
import {Box, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {Footprints} from "../../common/components";

interface Props {
}

const MAX_GOOSE_INDEX = 10;

const About: FunctionComponent<Props> = () => {
    return <>
        <Footprints/>
        <AboutMessage/>
    </>
};

export default About;

function AboutMessage() {

    const gooseIndex = Math.floor(Math.random() * MAX_GOOSE_INDEX + 1);
    const goosePicture = require("../../assets/goose/goose-profile" + String(gooseIndex) + ".png");
    const gooseSounds: any[] = [];
    for (let i = 0; i < 4; i++) {
        const honk = new Audio(require(`../../assets/audio/honk-sound-${i}.mp3`));
        honk.load();
        gooseSounds.push(honk);
    }

    return <div className="landing-page__content-wrapper">
        <div className="landing-page__content">
            <motion.div initial={{opacity: 0, y: 15}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.7}}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 100,
                    position: "relative",
                }} flexDirection="column">
                    <div className="landing-page__content__title">FYDP Group 58</div>
                    <Typography mt={1}>
                        Abhijeet Pande, William Wang, Stanley Guo, Andrew Peng, and Shyam Patel
                    </Typography>
                    <Typography>
                        For more inquiries, please contact support@uwfs.live
                    </Typography>
                    <Box mt={2}>
                        <img src={goosePicture} width={150} style={{borderRadius: "50%", cursor: "pointer"}}
                             onClick={() => gooseSounds[Math.floor(Math.random() * 4)].play()
                             }/>
                    </Box>
                </Box>
            </motion.div>
        </div>
    </div>

}
