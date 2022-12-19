const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const User = require("../../models/users");
const { createError } = require("../../helpers");

const avatarsDirPath = path.join(__dirname, "..", "..", "public", "avatars");

const updateAvatar = async (req, res) => {
    if (!req.file) {
        throw createError({ status: "401", message: "file does not exists" });
    }
    const { _id } = req.user;
    const { path: tmpPath, originalname } = req.file;
    const extension = path.extname(originalname);
    const filename = `${_id}${extension}`;

    const targetAvatarPath = path.join(avatarsDirPath, filename);

    Jimp.read(req.file.path, (err, file) => {
        if (err) throw err;
        file.resize(250, 250).write(targetAvatarPath);
    });
    await fs.rename(tmpPath, targetAvatarPath);

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    });
};

module.exports = updateAvatar;
