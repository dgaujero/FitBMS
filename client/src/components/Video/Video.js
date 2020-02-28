import React from 'react';
import flogo from './flogo.png';
import classes from './Video.module.css';

const Video = () => {
    const videoSource = "http://myholyname.org/Claudia-testarea/nicoles/images/fitbms.mp4"
    return (
        <div className={classes.Container} >
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                    <img
                        src={flogo}
                        alt="profile" />
                    <button type="button" className="btn btn-outline-dark">Sign In</button>

                </div>
            </div>
        </div>
    )
}

export default Video