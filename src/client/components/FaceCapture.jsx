import React, { Component } from "react";
import Webcam from "react-webcam";

import { ensurePhotoRequirements } from "../utils/facialDetection";

import * as Overlay from "./Overlays";
import { Cancel, Success, SuccessOutline } from "./Button";

const clmtrackr = require("react-clmtrackr");

const initialState = {
  screenshot: null,
  captureState: "noCam",
  photoSubmitted: false,
};

class FaceDetect extends React.Component {
  constructor(props) {
    super(props)

    this.state = initialState;

    this.timer = null;
    this.tracker = new clmtrackr.default.tracker();
    this.processWebcamFeed = this.processWebcamFeed.bind(this);
    this.handlePhotoReady = this.handlePhotoReady.bind(this);

    this.doManualCapture = this.doManualCapture.bind(this);
    this.retryCapture = this.retryCapture.bind(this);
    this.submitPhoto = this.submitPhoto.bind(this);

    this.getFeedbackMessage = this.getFeedbackMessage.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  doManualCapture() {
    clearInterval(this.timer);
    this.setState({ screenshot: this.webcam.getScreenshot() });
    this.handlePhotoReady();
  }

  retryCapture() {
    this.setState(initialState);
  }

  submitPhoto() {
    this.setState({
        photoSubmitted: true,
        captureState: "submitted"
    });

    this.props.handleSubmit(this.state.screenshot);
  }

  processWebcamFeed() {
    require("jquery.facedetection");

    const cameraFeed = document.querySelector(".cameraFeed");

    this.tracker.init();
    this.tracker.start(cameraFeed);

    this.setState({ captureState: "tracking" });

    this.timer = setInterval(() => {
        ensurePhotoRequirements(this.tracker, this.webcam.getScreenshot())
          .then(this.handlePhotoReady)
          .catch(errorState => {
            this.setState({ captureState: errorState })
          });
    }, 1000);
  }

  handlePhotoReady() {
    clearInterval(this.timer);
    this.tracker.stop();
    this.setState({
      screenshot: this.webcam.getScreenshot(),
      captureState: "captured",
    });
  }

  getFeedbackMessage() {
    switch (this.state.captureState) {
        case "captured":
            return { top: "Check quality", bottom: "Make sure your eyes are open and the image isn't blurred..." };
        case "submitted":
            return { top: "Approve " + this.props.captureType + " on MetaMask",
                     bottom: "Complete a small transaction through MetaMask to confirm this is an active account" };
        default:
            let msg = this.props.captureType === "enrollment" ? "Enroll your wallet" : "Verify your transaction";
            return { top: msg + " with a selfie", bottom: "Keep your face in the frame..." };
    }
  }

  componentWillUpdate() {
      if (this.props.retry && this.state.captureState === "submitted") {
          this.retryCapture();
      }
  }

  render() {
    const feedbackMessage = this.getFeedbackMessage(this.state.captureState);
    return (
      <div className="d-flex flex-column w-100 h-100 bg-white fixed-top justify-content-center" >
        <div className="d-flex flex-wrap w-100 cameraTop mb-auto" style={{minHeight:70}}>
            <div className="mx-auto ml-lg-3 pt-2" style={{zIndex:20}}>
                <Cancel onClick={this.props.handleBack} />
            </div>
            <h3 className="position-absolute w-100 text-center pt-5 pt-lg-3 mt-5 mt-lg-0">{feedbackMessage.top}</h3>
        </div>
        { this.state.screenshot
            ?
                <div className="cameraFeed">
                    <div className="screenshot" style={{backgroundImage:`url(${this.state.screenshot})`}}>
                        <img className="w-100 h-100" src="/static/img/wallet-gradient-oval-frame.svg" />
                    </div>
                </div>
            :
                <div className="mx-auto position-relative w-100">
                    <Webcam
                        className="cameraFeed"
                        screenshotFormat="image/jpeg"
                        audio={false}
                        ref={node => this.webcam = node }
                      />
                    <div className="position-absolute videoOverlay">
                        <img className="mx-auto h-100" src="/static/img/wallet-gradient-oval-frame.svg" />
                    </div>
                </div>
        }
        <div className="d-flex flex-column w-100 h-100 bottom cameraBottom mt-auto justify-content-center">
            <h3 className="text-center d-flex align-items-center mx-auto">{feedbackMessage.bottom}</h3>
            { this.state.photoSubmitted ? <div className="clearfix p-4">&nbsp;</div> :
                this.state.captureState === "captured"
                ?
                    <div className="d-flex flex-row flex-wrap align-items-center justify-content-center">
                        <SuccessOutline onClick={this.retryCapture} btnValue="Retake Photo" />
                        <div className="clearfix pb-5 p-0 p-1-sm">&nbsp;</div>
                        <Success onClick={this.submitPhoto} btnValue="Submit" />
                    </div>
                :
                    <div className="mx-auto py-2">
                        <Success onClick={this.doManualCapture} btnValue="Take Photo" />
                    </div>
            }
        </div>
      </div>
    );
  }
}

export default FaceDetect;
