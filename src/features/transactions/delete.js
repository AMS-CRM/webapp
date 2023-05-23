const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

exports = function (changeEvent) {
  if (updateDescription) {
    const updatedFields = updateDescription.updatedFields; // A document containing updated fields
    // Get the keys out of updated Object
    const keys = Object.keys(updatedFields);

    // Loop through the object and search if the paystub was updatedFields
    keys.forEach(async (key) => {
      const filter = key.includes("paystub");

      if (filter) {
        const fileName = updatedFields[key];
        const msg = {
          to: "deep.shiv880@gmail.com",
          from: "deep.shiv880@gmail.com", // Use the email address or domain you verified above
          subject: "This is an test email",
          text: fileName,
        };

        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      }
    });
  }
};
