const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const cryptoModel = require("../models/cryptoModel");

router.get("/update-exchange-data", async (req, res) => {
  let deleteColl = await cryptoModel.deleteMany({});
  console.log(deleteColl);
  const dataresponse = await axios.get("https://rest.coinapi.io/v1/exchanges", {
    headers: { "X-CoinAPI-Key": `C99341B5-2034-418C-AE89-4BC9936C5DBC` },
  });

  const dataresponseIcon = await axios.get(
    "https://rest.coinapi.io/v1/exchanges/icons/32",
    {
      headers: { "X-CoinAPI-Key": `C99341B5-2034-418C-AE89-4BC9936C5DBC` },
    }
  );

  let iconData = dataresponseIcon.data;
  let priceData = dataresponse.data;
  let iconDataObj = {};
  for (let obj of iconData) {
    iconDataObj[obj.exchange_id] = obj;
  }

  let dataToSave = [];
  for (let obj of priceData) {
    let reqObj = {
      name: obj.name,
      exchange_id: obj.exchange_id,
      website: obj.website,
      volume_1hrs_usd: obj.volume_1hrs_usd,
      volume_1day_usd: obj.volume_1day_usd,
      volume_1mth_usd: obj.volume_1mth_usd,
    };
    if (iconDataObj[obj.exchange_id]) {
      reqObj["icon_url"] = iconDataObj[obj.exchange_id].url;
    } else {
      reqObj["icon_url"] = "icon";
    }
    dataToSave.push(reqObj);
  }

  let saveData = await cryptoModel.create(dataToSave);

  if (saveData) {
    return res.status(201).send({
      message: "Data Saved successfully",
      data: "dataToSave",
      status: true,
    });
  } else {
    return res.status(400).send({ message: "unsuccessful" });
  }
});

router.get("/get-exchange-data", async (req, res) => {
  try {
    const dataDb = await cryptoModel.find();

    return res.status(201).send({ data: dataDb });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "server side error", error: e.message });
  }
});

module.exports = router;
