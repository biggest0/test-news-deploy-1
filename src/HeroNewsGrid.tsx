import Image from "./assets/ChatGPT Image Apr 13, 2025, 11_38_22 AM.png";
import NewsCard from "./news-card";
import news from "./data/mock.json"

export default function HeroNewsGrid() {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-3 mb-16 border-b-2 border-gray-200">
      {/* Big Image - spans 2x3 */}
      <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden">
        <img
          src={Image}
          alt="Featured News"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-xl font-bold">
        "Reading satire news is like getting your veggies in cake form—tasty, fun, and surprisingly informative." — Albert Mewstein
        </div>
      </div>

      {/* Remaining 4 articles in the rest of grid */}
      {news.slice(0, 4).map((article, index) => (
        // <div
        //   key={idx}
        //   className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all"
        // >
        //   <h3 className="font-semibold text-gray-800 text-sm mb-1">
        //     {article.title}
        //   </h3>
        //   <p className="text-xs text-gray-600 line-clamp-2">{article.body}</p>
        //   <p className="text-xs text-gray-400 mt-2">{article.date}</p>
        // </div>
        <NewsCard
        key={index}
          title={`${article.title}`}
        body={article.body}
        longBody={article.longBody}
        date={article.date}
        />
      ))}
    </div>
  );
}
