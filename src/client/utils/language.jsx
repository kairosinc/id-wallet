export const formatTimestamp = timestamp => {
    const millsecondsPerSecond = 1000;
    const millisecondsSinceEpoch = timestamp * millsecondsPerSecond;
    const dateObj = new Date(millisecondsSinceEpoch);

    return  dateObj.toLocaleDateString("en-GB", {day: 'numeric', month: 'short', year: 'numeric',})+ "\n" +
            dateObj.toLocaleTimeString("us-EN", {hour:'numeric', minute:'numeric'})
}

export const sanitizeErrorMessage = error => {
   let errorMessage = error;

   if (error.message) {
       errorMessage = error.message;
   }

   console.error("Error Before Sanitizing: "+errorMessage);

   if (errorMessage.startsWith("Error") || errorMessage.includes("Failed to fetch")) {
       error.message = defaultErrorMessage;
   }

   return error;
}

export const defaultErrorMessage =  "For some reason, we couldn't get that to work. Please try again. " +
                                    "If the problem continues, contact us.";