import {defaultErrorMessage} from "./language";

const buildHeaders = (appId, appKey) => {
  return {
    'content-type': 'application/json',
    'app_id': `${appId}`,
    'app_key': `${appKey}`
  };
};

const buildBody = (imageData, account, gallery) => {
  return JSON.stringify({
    image: imageData,
    subject_id: account,
    gallery_name: gallery
  });
};

const buildRequest = (appId, appKey, imageData, account, gallery) => {
  const method = 'POST';
  const headers = buildHeaders(appId, appKey);
  const body = buildBody(imageData, account, gallery);

  return { method, headers, body };
};

const sanitize = (data) => {
  // happy path
  if (data.blockchain) {
    return data.blockchain;
  }

  // kairos errors
  if (data.Errors) {
    let message = data.Errors.map(error => error.Message).join(", ");
    console.log("Error: "+ message);

    switch(true) {
        case message.includes("too many faces in image"):
        case message.includes("no faces found in the image"):
            message = "We couldn't accept that photo. Please try again.";
            break;
        default:
            console.error("Error Message: " + data.Errors);
            message = defaultErrorMessage;
    }

    throw new Error(message);
  }

  // idk something else happened
  console.error("Unexpected Error: " + data);
  throw new Error(defaultErrorMessage);
};

export const fetchSignature = (url, appId, appKey, imageData, account, galleryName) => {
  const request = buildRequest(appId, appKey, imageData, account, galleryName);

  return fetch(url, request)
          .catch(error => sanitize(error.message))
          .then(response => response.json())
          .then(data => sanitize(data))
};

export const ensureConfidenceMet = (data, confidenceThreshold) => {
  return new Promise((resolve, reject) => {
    const { confidence } = data.payload;

    if (confidence < confidenceThreshold) {
      const errorMessage = "We didn't recognize the face in this photo. Please try again.";
      reject(new Error(errorMessage));
    } else {
      resolve(data);
    }
  })
}

export const fetchConfidenceLimit = (url) => {
  return fetch(url)
  .then(response => response.json())
  .then(data => data.confidenceLimit)
};
