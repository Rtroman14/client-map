const Airtable = require("airtable");

module.exports = class AirtableApi {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("Using Airtable requires an API key.");
        }

        this.apiKey = apiKey;
    }

    async assignAirtable(baseID) {
        try {
            return new Airtable({ apiKey: this.apiKey }).base(baseID);
        } catch (error) {
            console.log("NO API KEY PROVIDED ---", error);
        }
    }

    async getRecords(baseID, table) {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base(table).select().all();

            const campaigns = res.map((campaign) => {
                return {
                    ...campaign.fields,
                    recordID: campaign.getId(),
                };
            });

            return campaigns;
        } catch (error) {
            console.log("getClients() ---", error);
            return false;
        }
    }

    async getContacts(baseID, view) {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base("Prospects").select({ view }).all();

            const contacts = res.map((contact) => {
                return {
                    ...contact.fields,
                    recordID: contact.getId(),
                };
            });

            return contacts;
        } catch (error) {
            console.log("ERROR GETCONTACTS() ---", error);
        }
    }
};
