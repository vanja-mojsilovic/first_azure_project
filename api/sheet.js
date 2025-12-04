const fetch = require("node-fetch");
module.exports = async function (context, req) {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQbaDrTcH-IsgpgrykNWZ8H1o8YQNDiw_i9C4SS-_mEE5FQQp1Wxpbx8uuQMPck9vJx4EDmLi61cGBn/pub?gid=1245792581&single=true&output=csv";
    const response = await fetch(sheetUrl);
    const csvData = await response.text();
    const rows = csvData.split("\n").map(r => r.split(","));
    let total = 0;
    for (let i = 1; i < rows.length; i++) {
        total += parseFloat(rows[i][1] || 0);
    }
    context.res = {
        body: { totalSales: total, rowCount: rows.length }
    };
};
