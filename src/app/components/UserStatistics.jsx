"use client";

import Image from "next/image";

export default function UserStatistics() {
  const stats = [
    { icon: "https://cdn.mypanel.link/hmz1fi/bcpg233dh40fsdoc.png", label: "Username", value: "58" },
    { icon: "https://cdn.mypanel.link/hmz1fi/raj356puppqixik9.png", label: "My Balance", value: "₹ 0" },
    { icon: "https://cdn.mypanel.link/hmz1fi/mp50mc1fhx7sm8o1.png", label: "Panel Orders", value: "6642" },
    { icon: "https://cdn.mypanel.link/hmz1fi/aw21tyz9g0kxlk1u.png", label: "Spent Balance", value: "₹ 0" },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="user_statistic_wraper d-flex flex-wrap gap-3">
            {stats.map((stat, index) => (
              <div className="statistic__item d-flex align-items-center gap-2" key={index}>
                <div className="icon">
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={50}
                    height={50}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="user__data">
                  <span>{stat.label}</span>
                  <h4>{stat.value}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
