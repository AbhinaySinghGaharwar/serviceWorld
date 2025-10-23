"use client";

import Image from "next/image";

const categories = [
  { icon: "fab fa-instagram", label: "Instagram", key: "instagram" },
  { icon: "fab fa-facebook", label: "Facebook", key: "facebook" },
  { icon: "fab fa-youtube", label: "Youtube", key: "youtube" },
  { icon: "fab fa-twitter", label: "Twitter", key: "twitter" },
  { icon: "fab fa-spotify", label: "Spotify", key: "spotify" },
  { icon: "fab fa-tiktok", label: "Tiktok", key: "tiktok" },
  { icon: "fab fa-telegram", label: "Telegram", key: "telegram" },
  { icon: "fab fa-linkedin", label: "Linkedin", key: "linkedin" },
  { icon: "fab fa-discord", label: "Discord", key: "discord" },
  { icon: "fas fa-globe", label: "Website Traffic", key: "traffic" },
  { icon: "fas fa-star-christmas", label: "Others", key: "other", isOther: true },
  { icon: "far fa-ball-pile", label: "Everythings", key: "everything" },
];

export default function CategoryFilter() {
  const handleFilter = (key, isOther = false) => {
    if (isOther) {
      console.log("Filter Others");
      // replace with filterOthers()
    } else {
      console.log("Filter:", key);
      // replace with filterStarted(key)
    }
  };

  return (
    <div id="category_filter" className="mb-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="category_filter_wrap">
              <div className="card card_v2">
                <div className="card-body">
                  <div className="filter_btn_wrap d-flex flex-wrap gap-2">
                    {categories.map((cat, index) => (
                      <button
                        key={index}
                        className="nwo-cat-btn btn_filter d-flex align-items-center gap-1"
                        onClick={() => handleFilter(cat.key, cat.isOther)}
                      >
                        <i className={cat.icon}></i>
                        <span className="filter_txt">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
