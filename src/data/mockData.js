// Mock data for the Pulse Workspace B2B SaaS Dashboard

export const kpiData = [
  {
    id: "mrr",
    title: "Monthly Recurring Revenue",
    value: "$42,150",
    change: "+12.4%",
    isPositive: true,
    sparkline: [38200, 39100, 39800, 41200, 40900, 42150],
    description: "vs. previous month"
  },
  {
    id: "subscribers",
    title: "Active Subscribers",
    value: "1,850",
    change: "+8.2%",
    isPositive: true,
    sparkline: [1710, 1735, 1760, 1795, 1820, 1850],
    description: "vs. previous month"
  },
  {
    id: "churn",
    title: "Churn Rate",
    value: "2.1%",
    change: "-0.4%",
    isPositive: false, // Decreasing churn is positive!
    sparkline: [2.5, 2.4, 2.3, 2.25, 2.18, 2.1],
    description: "vs. previous month"
  },
  {
    id: "arpu",
    title: "Avg. Revenue / User",
    value: "$22.78",
    change: "+3.8%",
    isPositive: true,
    sparkline: [21.95, 22.10, 22.35, 22.40, 22.62, 22.78],
    description: "vs. previous month"
  }
];

export const revenueData = {
  Day: [
    { name: "00:00", Revenue: 1200, Expenses: 800, Profit: 400 },
    { name: "04:00", Revenue: 1800, Expenses: 950, Profit: 850 },
    { name: "08:00", Revenue: 2400, Expenses: 1100, Profit: 1300 },
    { name: "12:00", Revenue: 3500, Expenses: 1250, Profit: 2250 },
    { name: "16:00", Revenue: 3100, Expenses: 1200, Profit: 1900 },
    { name: "20:00", Revenue: 2800, Expenses: 1050, Profit: 1750 },
    { name: "24:00", Revenue: 3400, Expenses: 1150, Profit: 2250 }
  ],
  Week: [
    { name: "Mon", Revenue: 12400, Expenses: 7100, Profit: 5300 },
    { name: "Tue", Revenue: 14500, Expenses: 7800, Profit: 6700 },
    { name: "Wed", Revenue: 13900, Expenses: 7500, Profit: 6400 },
    { name: "Thu", Revenue: 16200, Expenses: 8200, Profit: 8000 },
    { name: "Fri", Revenue: 18500, Expenses: 9100, Profit: 9400 },
    { name: "Sat", Revenue: 11200, Expenses: 6400, Profit: 4800 },
    { name: "Sun", Revenue: 9800, Expenses: 5800, Profit: 4000 }
  ],
  Month: [
    { name: "Week 1", Revenue: 48000, Expenses: 22000, Profit: 26000 },
    { name: "Week 2", Revenue: 51200, Expenses: 24500, Profit: 26700 },
    { name: "Week 3", Revenue: 53400, Expenses: 23800, Profit: 29600 },
    { name: "Week 4", Revenue: 58150, Expenses: 25100, Profit: 33050 }
  ],
  Year: [
    { name: "Jan", Revenue: 28000, Expenses: 15000, Profit: 13000 },
    { name: "Feb", Revenue: 31000, Expenses: 16200, Profit: 14800 },
    { name: "Mar", Revenue: 33500, Expenses: 17000, Profit: 16500 },
    { name: "Apr", Revenue: 35000, Expenses: 18100, Profit: 16900 },
    { name: "May", Revenue: 38200, Expenses: 19000, Profit: 19200 },
    { name: "Jun", Revenue: 39500, Expenses: 20100, Profit: 19400 },
    { name: "Jul", Revenue: 42150, Expenses: 21500, Profit: 20650 },
    { name: "Aug", Revenue: 44200, Expenses: 22100, Profit: 22100 },
    { name: "Sep", Revenue: 46800, Expenses: 23000, Profit: 23800 },
    { name: "Oct", Revenue: 48900, Expenses: 24200, Profit: 24700 },
    { name: "Nov", Revenue: 51200, Expenses: 25000, Profit: 26200 },
    { name: "Dec", Revenue: 54600, Expenses: 26800, Profit: 27800 }
  ]
};

export const subscriptionBreakdown = [
  { name: "Pro", value: 45, color: "#0057ff" },       // Blue
  { name: "Enterprise", value: 30, color: "#1b22f3" }, // Deep Blue
  { name: "Starter", value: 25, color: "#06b6d4" }     // Cyan
];

export const initialTransactions = [
  {
    id: "tx_101",
    customerName: "Sarah Jenkins",
    customerEmail: "sarah.j@acme.corp",
    amount: 1200.00,
    status: "Active",
    date: "2026-07-21",
    plan: "Enterprise"
  },
  {
    id: "tx_102",
    customerName: "Marcus Vance",
    customerEmail: "marcus@vance.io",
    amount: 149.00,
    status: "Active",
    date: "2026-07-21",
    plan: "Pro"
  },
  {
    id: "tx_103",
    customerName: "Chloe Dupont",
    customerEmail: "c.dupont@designlab.fr",
    amount: 49.00,
    status: "Pending",
    date: "2026-07-20",
    plan: "Starter"
  },
  {
    id: "tx_104",
    customerName: "David Miller",
    customerEmail: "d.miller@techflow.net",
    amount: 1200.00,
    status: "Active",
    date: "2026-07-19",
    plan: "Enterprise"
  },
  {
    id: "tx_105",
    customerName: "Elena Rostova",
    customerEmail: "elena@rostova.co",
    amount: 149.00,
    status: "Canceled",
    date: "2026-07-18",
    plan: "Pro"
  },
  {
    id: "tx_106",
    customerName: "John Smith",
    customerEmail: "john.smith@cyberdyne.org",
    amount: 1200.00,
    status: "Active",
    date: "2026-07-18",
    plan: "Enterprise"
  },
  {
    id: "tx_107",
    customerName: "Aiko Tanaka",
    customerEmail: "aiko@tanaka.jp",
    amount: 49.00,
    status: "Active",
    date: "2026-07-17",
    plan: "Starter"
  },
  {
    id: "tx_108",
    customerName: "Oliver Kahn",
    customerEmail: "o.kahn@bundes.de",
    amount: 149.00,
    status: "Pending",
    date: "2026-07-16",
    plan: "Pro"
  },
  {
    id: "tx_109",
    customerName: "Sophia Martinez",
    customerEmail: "sophia.m@solaris.es",
    amount: 1200.00,
    status: "Active",
    date: "2026-07-15",
    plan: "Enterprise"
  },
  {
    id: "tx_110",
    customerName: "Liam O'Connor",
    customerEmail: "liam@dublintech.ie",
    amount: 49.00,
    status: "Canceled",
    date: "2026-07-14",
    plan: "Starter"
  }
];

export const initialActivities = [
  {
    id: "act_1",
    type: "subscribe",
    user: "Sarah Jenkins",
    message: "upgraded to Enterprise Plan",
    time: "2 mins ago"
  },
  {
    id: "act_2",
    type: "payment",
    user: "Marcus Vance",
    message: "successfully paid monthly invoice ($149)",
    time: "15 mins ago"
  },
  {
    id: "act_3",
    type: "invite",
    user: "David Miller",
    message: "invited 4 team members to workspace",
    time: "1 hour ago"
  },
  {
    id: "act_4",
    type: "update",
    user: "System",
    message: "Database optimization backup completed successfully",
    time: "3 hours ago"
  },
  {
    id: "act_5",
    type: "cancel",
    user: "Elena Rostova",
    message: "canceled subscription (reason: budget constraints)",
    time: "5 hours ago"
  }
];

export const systemNotifications = [
  {
    id: "not_1",
    title: "System Performance Alert",
    description: "CPU usage spiked to 89% during DB backup, now stabilized.",
    time: "10m ago",
    unread: true,
    type: "warning"
  },
  {
    id: "not_2",
    title: "New High-Value Deal",
    description: "Sarah Jenkins (Acme Corp) upgraded to Enterprise ($1,200/mo).",
    time: "32m ago",
    unread: true,
    type: "success"
  },
  {
    id: "not_3",
    title: "Security Update",
    description: "Two-factor authentication (2FA) enforced on all admin logs.",
    time: "4h ago",
    unread: false,
    type: "info"
  },
  {
    id: "not_4",
    title: "Failed Payment Attempt",
    description: "Invoice #9822 for Elena Rostova failed processing.",
    time: "1d ago",
    unread: false,
    type: "error"
  }
];

export const switcherWorkspaces = [
  { id: "ws_1", name: "Acme Production", plan: "Enterprise" },
  { id: "ws_2", name: "Dev/Staging Workspace", plan: "Free" },
  { id: "ws_3", name: "Personal Sandbox", plan: "Pro" }
];
