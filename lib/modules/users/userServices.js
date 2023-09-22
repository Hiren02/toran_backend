const dao = require("./userDao");
let { arr, convertDay } = require('../../constant')
let { arr2 } = require('../../constant');
const User = require("../../modal/user");
const axios = require('axios');

async function registerUser(details) {
  try {
    const { date } = details || {};
    if (date && date !== "") {
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
            await fetch(`https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`, options).then(response => response.json())
              .then(async response => {
                if (response && response.success === true && response.code === "PAYMENT_SUCCESS") {
                  let verificationCode = Math.floor(
                    Math.random() * (999999 - 100000) + 100000
                  );
                  const update = { $set: response, verificationCode };
                  const userData = await User.findOneAndUpdate({ merchantTransactionId }, update)
                  const payload = {
                    USER_ID: "1001063",
                    API_KEY: "4ff5e1c7d6474710db83",
                  }
                  const auth = await axios.post('https://sms.soft-techsolutions.com/v3/sms/AuthToken', payload, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': "Bearer 59ff9ada4b4d734363d1d9996fe4f0fb463c6cdef680b121f25482ec5ae79226"
                    }
                  })
                  if (auth && auth.data?.status === 'success') {
                    const { jwtToken: { token } } = auth?.data || {}
                    const smsSendRequest = {
                      USER_ID: "1001063",
                      API_AUTH_KEY: "4ff5e1c7d6474710db83",
                      REG_TEMP_ID: "56",
                      SENDER_ID: "TORANG",
                      SMS_TYPE: "T", /* T / P / I */
                      TRNTYPE: "T", /* T - Transaction / O - OTP / B - Bulk */
                      UNICODE: "N",
                      MESSAGE_TYPE: "N",
                      SCHEDULER: "N",
                      SCHEDULER_DT: "",
                      SMS_DATA: [
                        {
                          DATA: [ //ADD MULTIPLE NO IN ARRAY
                            {
                              MOBILE_NO: userData.mobile_number,
                              REF_NO: "3",
                              TEMPLATE_ID: "1007971979286013652",
                              MESSAGE: `Your booking in Toran Club has been successfully done.Your slot time is ${userData.slot?.map((data) => data.slot)} on ${userData.date} and code is ${verificationCode}.Toran Club`
                            }
                          ]
                        }
                      ]
                    }
                    const sendMessage = await axios.post('https://sms.soft-techsolutions.com/v3/sms/submit_bulk', smsSendRequest, {
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                      }
                    })
                    if (sendMessage && sendMessage.status === 'success') {
                      const updated = { $set: { sendMessage: true } };
                      await User.findOneAndUpdate({ merchantTransactionId }, updated)
                    }
                  }
                  clearInterval(intervalId)
                  return
                }
              })
              .catch(err => console.error(err));
          } else {
            await User.findOneAndDelete({ merchantTransactionId })
            clearInterval(intervalId);
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

async function verifyCode(details) {
  const { mobile_number, verificationCode } = details || {};
  if (mobile_number) {
    const data = await User.findOne(details);
    if (data) {
      const update = { $set: { verificationCode: "" } };
      const userData = await User.findOneAndUpdate({ mobile_number }, update)
      if (userData && userData?._id) {
        return { success: true }
      } else {
        return { success: false, error: "Internal server error" }
      }
    } else {
      return { success: false, error: "Something went wrong" }
    }
  } else {
    return { error: "Invalid details " }
  }
}

async function bookSlotFromAdmin(details) {
  try {
    const { slot, date, slug } = details;
    if (date !== "" && slot.length > 0 && slug === "Admin@#toran") {
      const data = await dao.getDetails({ date: details.date });
      if (data && data?.length > 0) {
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
          return { success: true, message: "Slot already booked." }
        } else {
          const userData = await User.create(details)
          return userData
        }
      } else {
        const userData = await User.create(details)
        return userData
      }
    } else {
      return { error: "Invalid details " }
    }
  } catch (error) {
    console.log(error)
    return { error: "Internal server error" }
  }
}

module.exports = {
  registerUser,
  userDetails,
  initiatePayment,
  checkAvailableSlot,
  getAllUserDetails,
  verifyCode,
  bookSlotFromAdmin
};
