const dao = require("./userDao");
let { arr, convertDay } = require('../../constant')
let { arr2 } = require('../../constant');
const User = require("../../modal/user");
const axios = require('axios');
const nodemailer = require('nodemailer');

async function registerUser(details) {
  try {
    const { date } = details || {};
    if (date) {
      const data = await dao.getDetails(details);
      let arr3 = [];
      let newarr2 = arr2
      let newarr = arr
      if (data && data.length > 0) {
        data.map((data1) => {
          let day = convertDay(data1.date)
          data1.slot.map((data2) => {
            if (day == 0 || day == 6) {
              newarr2 = newarr2.filter(item => item.slot != data2.slot);
              arr3 = newarr2
            } else {
              newarr = newarr.filter(item => item.slot != data2.slot)
              arr3 = newarr
            }
          })

        })
        return arr3;

      }
      else {
        let day = convertDay(details.date)
        if (day === 0 || day === 6) {
          return arr2
        }
        else {
          return arr;
        }
      }
    } else {
      return { error: "Invalid date" }
    }

  } catch (error) {
    return { error: "internal server error " }
  }
}

async function userDetails(details) {
  try {
    const { name, email, mobile_number, price, date, slot, sport, merchantTransactionId, merchantUserId } = details || {};
    if (name !== "" || email !== "" || mobile_number !== "" || price !== "" || date !== "" || slot !== "" || sport !== "" || merchantTransactionId !== "" || merchantUserId !== "") {
      userData = await User.create(details)
      if (userData) {
        return userData
      } else {
        return { error: "Something went wrong" }
      }
    } else {
      return { error: "Invalid details" }
    }

  } catch (error) {
    return { error: "Internal server error" }
  }
}

async function initiatePayment(data) {
  try {
    const { sha, base64, merchantTransactionId, newsha } = data
    if (sha !== "" && base64 !== "" && merchantTransactionId !== "") {
      const payload = { request: base64 }
      const response = await axios.post("https://api.phonepe.com/apis/hermes/pg/v1/pay", payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": sha,
          }
        }
      )
      if (response && response.data) {
        const startTime = Date.now();
        const endTime = startTime + 20 * 60 * 1000;
        const intervalId = setInterval(async function () {
          if (Date.now() < endTime) {
            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': newsha,
                'X-MERCHANT-ID': process.env.MERCHANT_ID
              }
            };
            await fetch(`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`, options).then(response => response.json())
              .then(async response => {
                if (response && response.success === true) {
                  const update = { $set: { ...response, success: response.success } };
                  await User.findOneAndUpdate({ merchantTransactionId }, update)
                  return
                }
              })
              .catch(err => console.error(err));
          } else {
            clearInterval(intervalId);
            const newuserData = await User.findOne({ merchantTransactionId })
            if (newuserData && newuserData?.success === true) {
              let verificationCode = Math.floor(
                Math.random() * (999999 - 100000) + 100000
              );
              const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                  user: process.env.EMAIL_SENDER_NAME,      // Replace with your Gmail email
                  pass: process.env.EMAIL_PASSWORD   // Replace with your Gmail password or an app-specific password
                }
              });

              // Setup email data
              const mailOptions = {
                from: process.env.EMAIL_SENDER_NAME,     // Sender's email address
                to: newuserData.email, // Recipient's email address
                subject: 'Verification code from toran club',
                text: `This is your verification code: ${verificationCode} from toran club`
              };

              // Send the email
              transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                  console.log('Error sending email:', error);
                } else {
                  const update = { $set: { verificationCode } }
                  await User.findOneAndUpdate({ merchantTransactionId }, update)
                }
              });
            } else {
              await User.findOneAndDelete({ merchantTransactionId })
            }
          }
        }, 15000);
        return response.data
      } else {
        return { error: "Something went wrong" }
      }
    } else {
      return { error: "Invalid details" }
    }
  } catch (error) {

  }
}

async function checkAvailableSlot(details) {
  try {
    const { slot, date } = details;
    if (date !== "" && slot.length > 0) {
      const data = await dao.getDetails({ date: details.date });
      if (data && data.length > 0) {
        let success = false
        await data.map((data1) => {
          data1?.slot.map((data2) => {
            details.slot.map((data3) => {
              if (data3.slot === data2.slot) {
                success = true
              }
            });
          })
        })

        if (success) {
          return { success: true }
        } else {
          return { success: false }
        }
      } else {
        return { success: false }
      }
    } else {
      return { error: "Invalid details " }
    }
  } catch (error) {
    console.log(error)
    return { error: "Internal server error" }
  }
}

async function getAllUserDetails(details) {
  try {
    const { date } = details || {};
    if (date && date !== "") {
      const userData = await dao.getDetails(details)
      if (userData && userData.length > 0) {
        return userData
      } else {
        return { error: "Data not found" }
      }

    } else {
      return { error: "Invalid details " }
    }
  } catch (error) {
    return { error: "Internal server error" }
  }
}

module.exports = {
  registerUser,
  userDetails,
  initiatePayment,
  checkAvailableSlot,
  getAllUserDetails
};
