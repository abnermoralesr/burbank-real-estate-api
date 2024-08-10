import upload from "#middleware/upload.js";
import serverCodes from "#core/codes.js";
import fs from "fs";

const baseUrl = process.env.SERVER_URL + process.env.API_PATH + 'file/';


export const createFile = async (req, res) => {
    try {
        await upload(req, res);

    if (req.file == undefined) {
      return res.status(serverCodes.badRequest).send({ message: "Please upload a file!" });
    }

    res.status(serverCodes.success).json({
      file: baseUrl + req.file.originalname,
    });
  } catch (err) {  
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 4MB!",
      });
    }
    
      console.log(err)

    res.status(serverCodes.error).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
}

export const getFiles = (req, res) => {
  const directoryPath = "./resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(serverCodes.error).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
}

export const getFile = async (req, res) => {
  const fileName = req.params.id;
  const directoryPath = "./resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(serverCodes.error).send({
        message: "Could not download the file. " + err,
      });
    }
  });
}

export const updateFile = async (req, res) => {
}

export const deleteFile = async (req, res) => {
}