import { sanitizeErrorMessage } from './language';

export const tokenConfidenceThreshold = (token) => {
  return new Promise ((resolve, reject) => {
    token.confidenceThreshold((error, threshold) => {
      if (error) reject(error);
      resolve(threshold);
    })
  })
}

export const tokenRegistration = (token, data) => {
  return new Promise((resolve, reject) => {
    const { payload, signature } = data;
    token.register(
      payload.faceId, payload.confidence, payload.subjectId,
      signature.r, signature.s, signature.v,
      (error, tx) => {
        if (error) reject(sanitizeErrorMessage(error));
        else resolve(tx)
    });
  });
}

export const tokenVerificationAndTransfer = (token, data, to, amount) => {
  return new Promise((resolve, reject) => {
    const { payload, signature } = data;
    token.verifyAndTransfer(
      payload.faceId, payload.confidence, payload.subjectId,
      signature.r, signature.s, signature.v, to, amount,
      (error, tx) => {
        if (error) reject(sanitizeErrorMessage(error));
        else resolve(tx)
    });
  });
}