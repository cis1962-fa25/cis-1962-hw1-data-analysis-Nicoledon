/**
 * [TODO] Step 0: Import the dependencies, fs and papaparse
 */
const fs = require('fs');
const papaparse = require('papaparse');
/**
 * [TODO] Step 1: Parse the Data
 *      Parse the data contained in a given file into a JavaScript objectusing the modules fs and papaparse.
 *      According to Kaggle, there should be 2514 reviews.
 * @param {string} filename - path to the csv file to be parsed
 * @returns {Object} - The parsed csv file of app reviews from papaparse.
*/
function parseData(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    const csv = papaparse.parse(data, { header: true });
    return csv;
}

/**
 * [TODO] Step 2: Clean the Data
 *      Filter out every data record with null column values, ignore null gender values.
 *
 *      Merge all the user statistics, including user_id, user_age, user_country, and user_gender,
 *          into an object that holds them called "user", while removing the original properties.
 *
 *      Convert review_id, user_id, num_helpful_votes, and user_age to Integer
 *
 *      Convert rating to Float
 *
 *      Convert review_date to Date
 * @param {Object} csv - a parsed csv file of app reviews
 * @returns {Object} - a cleaned csv file with proper data types and removed null values
 */
function cleanData(csv) {
    csv.data.filter((row) => {
        return row.review_id != null && row.user_id != null && row.app_name != null && row.app_category != null && row.review_text != null && row.review_language != null && row.rating != null && row.review_date != null && row.verified_purchase != null && row.device_type != null && row.num_helpful_votes != null && row.user_age != null && row.user_country != null && row.app_version != null;
    });
    const filter_data = []
    csv.data.forEach((row) => {
        user = {
            user_id: parseInt(row.user_id),
            user_age: parseInt(row.user_age),
            user_country: row.user_country,
            user_gender: row.user_gender
        }
        const obj = {
            review_id: parseInt(row.review_id),
            app_name: row.app_name,
            app_category: row.app_category,
            review_text: row.review_text,
            review_language: row.review_language,
            rating: parseFloat(row.rating),
            review_date: new Date(row.review_date),
            verified_purchase: row.verified_purchase == "True" ? true : false,
            device_type: row.device_type,
            num_helpful_votes: parseInt(row.num_helpful_votes),
            user: user
        }
        filter_data.push(obj)
    })
    return filter_data
}

/**
 * [TODO] Step 3: Sentiment Analysis
 *      Write a function, labelSentiment, that takes in a rating as an argument
 *      and outputs 'positive' if rating is greater than 4, 'negative' is rating is below 2,
 *      and 'neutral' if it is between 2 and 4.
 * @param {Object} review - Review object
 * @param {number} review.rating - the numerical rating to evaluate
 * @returns {string} - 'positive' if rating is greater than 4, negative is rating is below 2,
 *                      and neutral if it is between 2 and 4.
 */
function labelSentiment({ rating }) {
    if (rating > 4) {
        return 'positive';
    } else if (rating < 2) {
        return 'negative';
    } else {
        return 'neutral';
    }
}

/**
 * [TODO] Step 3: Sentiment Analysis by App
 *      Using the previous labelSentiment, label the sentiments of the cleaned data
 *      in a new property called "sentiment".
 *      Add objects containing the sentiments for each app into an array.
 * @param {Object} cleaned - the cleaned csv data
 * @returns {{app_name: string, positive: number, neutral: number, negative: number}[]} - An array of objects, each summarizing sentiment counts for an app
 */
function sentimentAnalysisApp(cleaned) {
    const sentimentAnalysisApp = [];
    cleaned.forEach((row) => {
        const sentiment = labelSentiment(row);
        const app = sentimentAnalysisApp.find((app) => app.app_name === row.app_name);
        if (app) {
            app[sentiment]++;
        } else {
            sentimentAnalysisApp.push({ app_name: row.app_name, positive: 0, neutral: 0, negative: 0 });
        }
    });
    return sentimentAnalysisApp;
}

/**
 * [TODO] Step 3: Sentiment Analysis by Language
 *      Using the previous labelSentiment, label the sentiments of the cleaned data
 *      in a new property called "sentiment".
 *      Add objects containing the sentiments for each language into an array.
 * @param {Object} cleaned - the cleaned csv data
 * @returns {{lang_name: string, positive: number, neutral: number, negative: number}[]} - An array of objects, each summarizing sentiment counts for a language
 */
function sentimentAnalysisLang(cleaned) {
    const sentimentAnalysisLang = [];
    cleaned.forEach((row) => {
        const sentiment = labelSentiment(row);
        const lang = sentimentAnalysisLang.find((lang) => lang.lang_name === row.review_language);
        if (lang) {
            lang[sentiment]++;
        } else {
            sentimentAnalysisLang.push({ lang_name: row.review_language, positive: 0, neutral: 0, negative: 0 });
        }
    });
    return sentimentAnalysisLang;
}

/**
 * [TODO] Step 4: Statistical Analysis
 *      Answer the following questions:
 *
 *      What is the most reviewed app in this dataset, and how many reviews does it have?
 *
 *      For the most reviewed app, what is the most commonly used device?
 *
 *      For the most reviewed app, what the average star rating (out of 5.0)?
 *
 *      Add the answers to a returned object, with the format specified below.
 * @param {Object} cleaned - the cleaned csv data
 * @returns {{mostReviewedApp: string, mostReviews: number, mostUsedDevice: String, mostDevices: number, avgRating: float}} -
 *          the object containing the answers to the desired summary statistics, in this specific format.
 */
function summaryStatistics(cleaned) { }

/**
 * Do NOT modify this section!
 */
module.exports = {
    parseData,
    cleanData,
    sentimentAnalysisApp,
    sentimentAnalysisLang,
    summaryStatistics,
    labelSentiment
};
