const router = require("express").Router();
const service = require("./userServices");
router.route("/getslot").post((req, res) => {
  service
    .registerUser(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send({ error: "internal server erorr" });
    });
});

router.route("/userdetails").post((req, res) => {
  service.userDetails(req.body).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      console.error(error);
      res.send({ error: "internal server erorr" });
    });
});

router.route("/pay").post((req, res) => {
  service.initiatePayment(req.body).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      console.error(error);
      res.send({ error: "internal server erorr" });
    });
});

router.route("/checkAvailableSlot").post((req, res) => {
  service.checkAvailableSlot(req.body).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      console.error(error);
      res.send({ error: "internal server erorr" });
    });
});

router.route("/getAllUserDetails").post((req, res) => {
  service.getAllUserDetails(req.body).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      console.error(error);
      res.send({ error: "internal server erorr" });
    });
});

router.route("/verifyCode").post((req, res) => {
  service.verifyCode(req.body).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      console.error(error);
      res.send({ error: "internal server erorr" });
    });
});

router.route("/bookSlotFromAdmin").post((req, res) => {
  service.bookSlotFromAdmin(req.body).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      console.error(error);
      res.send({ error: "internal server erorr" });
    });
});




module.exports = router;
