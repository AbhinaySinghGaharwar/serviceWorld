const stats = {
  totalUsers: 12450,
  totalCoinsEarned: 985000,
  totalWithdrawals: 4320,
  totalTasksCompleted: 21890,
};

const tasks = [
  {
    id: "T001",
    title: "Follow us on Instagram",
    platform: "Instagram",
    description: "Follow our official Instagram account and stay connected.",
    reward: 50,
    link: "https://instagram.com",
    proofRequired: true,
    status: "Available",
    timeLimit: "24 hours",
  },
  {
    id: "T002",
    title: "Like our Facebook Page",
    platform: "Facebook",
    description: "Like our Facebook page to support us.",
    reward: 40,
    link: "https://facebook.com",
    proofRequired: false,
    status: "Available",
    timeLimit: "12 hours",
  },
  {
    id: "T003",
    title: "Subscribe on YouTube",
    platform: "YouTube",
    description: "Subscribe to our YouTube channel for updates.",
    reward: 70,
    link: "https://youtube.com",
    proofRequired: true,
    status: "Pending",
    timeLimit: "48 hours",
  },
];

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Earn Coins by Completing Tasks
      </h1>

      {/* Platform Stats */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <StatCard title="Coins Earned" value={stats.totalCoinsEarned} />
        <StatCard title="Withdrawals" value={stats.totalWithdrawals} />
        <StatCard title="Tasks Completed" value={stats.totalTasksCompleted} />
      </div>

      {/* Task List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-900 rounded-lg p-5 shadow"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                {task.title}
              </h2>
              <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
                {task.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {task.description}
            </p>

            <div className="mt-2 text-sm text-gray-700 dark:text-gray-400 space-y-1">
              <p><strong>Task ID:</strong> {task.id}</p>
              <p><strong>Platform:</strong> {task.platform}</p>
              <p><strong>Reward:</strong> +{task.reward} Coins</p>
              <p><strong>Proof Required:</strong> {task.proofRequired ? "Yes" : "No"}</p>
              <p><strong>Time Limit:</strong> {task.timeLimit}</p>
            </div>

            <a
              href={task.link}
              target="_blank"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Do Task
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Reusable Stat Card */
function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-xl font-bold text-gray-800 dark:text-white">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
