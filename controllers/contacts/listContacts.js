const Contact = require("../../models/contacts");

const listContacts = async (req, res) => {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const searchParams = { owner: _id };
    if (favorite) {
        searchParams.favorite = favorite;
    }
    console.log(searchParams);
    const result = await Contact.find(
        searchParams,
        {},
        {
            skip,
            limit,
        }
    ).populate("owner", "email subscription");

    const totalDocs = await Contact.find(searchParams);
    const docsByCurrentPage = parseInt(page) * parseInt(limit);
    const remainingDocs = totalDocs.length - docsByCurrentPage;
    const prevPage = parseInt(page) - 1 <= 0 ? null : parseInt(page) - 1;
    const nextPage = remainingDocs <= 0 ? null : parseInt(page) + 1;

    const paginationInfo = {
        currentPage: parseInt(page),
        prevPage,
        nextPage,
        totalDocs: totalDocs.length,
        hasNext: !!nextPage,
        hasPrev: !!prevPage,
        perPageLimit: parseInt(limit),
    };
    res.json({ data: result, paginationInfo });
};

module.exports = listContacts;
