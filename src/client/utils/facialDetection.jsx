import $ from "jquery";

import { ensureBrightness } from "../utils/webcam";

function ensureNumberOfFaces(imageSrc) {
  require("jquery.facedetection");
  return new Promise((resolve, reject) => {
    const requiredNumberOfFaces = 1;
    const img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    img.onload = handleImageLoad;
    document.body.appendChild(img);

    function handleImageLoad() {
      $(img).faceDetection({
        complete: function (faces) {
          if (faces.length !== requiredNumberOfFaces)
            reject("tooManyFaces");
          else resolve();
          this.remove();
        }
      });
    }
  });
}

function identifyFace(tracker) {
  const maximumConvergence = 50;
  const minimumScore = 0.3;
  const minimumEyeDistance = 80;

  return new Promise((resolve, reject) => {
    const pos = tracker.getCurrentPosition();
    const convergence = tracker.getConvergence();
    const distance = pos && eyeDistance(pos);
    const score = tracker.getScore();
    if (!pos)
      reject("noFace");
    else if (convergence > maximumConvergence || score < minimumScore)
      reject("tooMuchMovement");
    else if (distance < minimumEyeDistance)
      reject("tooFar");
    else resolve();
  });
}

function eyeDistance(currentPosition) {
  const rightEyeIndex = 27;
  const leftEyeIndex = 32;
  const xIndex = 0;
  const rightEye = currentPosition[rightEyeIndex];
  const leftEye = currentPosition[leftEyeIndex];
  const rightEyeX = rightEye[xIndex];
  const leftEyeX = leftEye[xIndex];

  return leftEyeX - rightEyeX;
}

export function ensurePhotoRequirements(tracker, screenshot) {
  return ensureBrightness(screenshot)
    .then(() => identifyFace(tracker))
    .then(() => ensureNumberOfFaces(screenshot));
}
