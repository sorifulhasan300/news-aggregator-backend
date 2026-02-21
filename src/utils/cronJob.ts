import cron from "node-cron";
import axios from "axios";
import Article from "../models/Article";
const API_KEY = process.env.API_KEY || "pub_7294a71da6bb4b13bc5c1f6f75d322c2";
const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}`;

export const fetchNews = async () => {
  console.log("Fetching latest news from API...");
  try {
    const response = await axios.get(API_URL);
    const articles = response.data.results;

    if (!articles) return;

    for (const item of articles) {
      await Article.findOneAndUpdate(
        { article_id: item.article_id },
        {
          title: item.title,
          link: item.link,
          description: item.description,
          content: item.content,
          creator: item.creator,
          language: item.language,
          country: item.country,
          category: item.category,
          datatype: item.datatype,
          pubDate: new Date(item.pubDate),
          image_url: item.image_url,
          source_id: item.source_id,
          source_name: item.source_name,
        },
        { upsert: true, new: true },
      );
    }
    console.log(`${articles.length} articles processed successfully.`);
  } catch (error) {
    console.error("Error in news ingestion:", error);
  }
};

export const setupNewsCron = () => {
  cron.schedule("0 * * * *", () => {
    fetchNews();
  });
};
