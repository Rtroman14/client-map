require("dotenv").config();
const AirtableApi = require("../../utils/Airtable");
const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

export default async function clients(req, res) {
    if (req.method === "GET") {
        const response = await Airtable.getRecords("appGB7S9Wknu6MiQb", "Clients");

        res.status(200).json(response);
    }
}
