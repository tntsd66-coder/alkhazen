
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Package, LayoutDashboard, TrendingUp, FileText, Settings,
  Plus, Search, Download, Printer, ArrowUpCircle, ArrowDownCircle,
  Bell, ChevronDown, X, AlertTriangle, CheckCircle, Globe,
  BarChart2, DollarSign, Layers, Filter, Edit2, Trash2,
  RefreshCw, Menu, XCircle, ShoppingCart, Warehouse, Activity
} from "lucide-react";

const TRANSLATIONS = {
  en: {
    appName: "Al-Khazen",
    tagline: "Inventory Management",
    dashboard: "Dashboard",
    items: "Items",
    movements: "Stock Movement",
    reports: "Reports",
    settings: "Settings",
    totalItems: "Total Items",
    totalValue: "Asset Value",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
    itemCode: "Item Code",
    itemName: "Item Name",
    category: "Category",
    quantity: "Qty",
    reorderPoint: "Reorder",
    status: "Status",
    price: "Unit Price",
    actions: "Actions",
    addItem: "Add Item",
    search: "Search items...",
    filterByCategory: "All Categories",
    inStock: "In Stock",
    lowStockLabel: "Low Stock",
    outOfStockLabel: "Out of Stock",
    movementNo: "Mov. #",
    itemNameCol: "Item",
    operation: "Operation",
    qtyMoved: "Qty",
    date: "Date",
    inbound: "Inbound",
    outbound: "Outbound",
    addMovement: "New Movement",
    exportCSV: "Export CSV",
    print: "Print",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    dispatch: "Dispatch",
    receive: "Receive",
    currency: "Currency Symbol",
    vat: "VAT %",
    language: "Language",
    settingsTitle: "System Settings",
    categoryAll: "All",
    addItemTitle: "Add New Item",
    addMovementTitle: "New Stock Movement",
    selectItem: "Select Item",
    selectOperation: "Select Operation",
    totalMovements: "Total Movements",
    recentActivity: "Recent Activity",
    stockHealth: "Stock Health",
    assetBreakdown: "Top Items by Value",
    close: "Close",
    confirm: "Confirm",
    dispatchQty: "Dispatch Quantity",
    receiveQty: "Receive Quantity",
    currentQty: "Current Qty",
    notEnoughStock: "Not enough stock!",
    movementSuccess: "Movement recorded successfully",
    itemSaved: "Item saved successfully",
  },
  ar: {
    appName: "الخازن",
    tagline: "نظام إدارة المخزون",
    dashboard: "لوحة التحكم",
    items: "الأصناف",
    movements: "حركة المخزون",
    reports: "التقارير",
    settings: "الإعدادات",
    totalItems: "إجمالي الأصناف",
    totalValue: "قيمة الأصول",
    lowStock: "مخزون منخفض",
    outOfStock: "نفاذ المخزون",
    itemCode: "كود الصنف",
    itemName: "اسم المنتج",
    category: "التصنيف",
    quantity: "الكمية",
    reorderPoint: "حد الطلب",
    status: "الحالة",
    price: "سعر الوحدة",
    actions: "الإجراءات",
    addItem: "إضافة صنف",
    search: "بحث في الأصناف...",
    filterByCategory: "كل التصنيفات",
    inStock: "متوفر",
    lowStockLabel: "منخفض",
    outOfStockLabel: "نافذ",
    movementNo: "رقم الحركة",
    itemNameCol: "الصنف",
    operation: "نوع العملية",
    qtyMoved: "الكمية",
    date: "التاريخ",
    inbound: "وارد",
    outbound: "صادر",
    addMovement: "حركة جديدة",
    exportCSV: "تصدير CSV",
    print: "طباعة",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    dispatch: "صرف",
    receive: "توريد",
    currency: "رمز العملة",
    vat: "نسبة الضريبة %",
    language: "اللغة",
    settingsTitle: "إعدادات النظام",
    categoryAll: "الكل",
    addItemTitle: "إضافة صنف جديد",
    addMovementTitle: "حركة مخزون جديدة",
    selectItem: "اختر الصنف",
    selectOperation: "اختر العملية",
    totalMovements: "إجمالي الحركات",
    recentActivity: "آخر النشاطات",
    stockHealth: "حالة المخزون",
    assetBreakdown: "أعلى الأصناف قيمةً",
    close: "إغلاق",
    confirm: "تأكيد",
    dispatchQty: "كمية الصرف",
    receiveQty: "كمية التوريد",
    currentQty: "الكمية الحالية",
    notEnoughStock: "الكمية غير كافية!",
    movementSuccess: "تم تسجيل الحركة بنجاح",
    itemSaved: "تم حفظ الصنف بنجاح",
  }
};

const INITIAL_ITEMS = [
  { id: "ITM-001", name: "Wireless Keyboard", category: "Electronics", qty: 45, reorder: 20, price: 35.99 },
  { id: "ITM-002", name: "Ergonomic Chair", category: "Furniture", qty: 12, reorder: 5, price: 249.00 },
  { id: "ITM-003", name: "A4 Paper Ream", category: "Stationery", qty: 8, reorder: 10, price: 6.50 },
  { id: "ITM-004", name: "USB-C Hub", category: "Electronics", qty: 0, reorder: 15, price: 49.99 },
  { id: "ITM-005", name: "Monitor Stand", category: "Furniture", qty: 23, reorder: 8, price: 79.00 },
  { id: "ITM-006", name: "Ballpoint Pens (12pk)", category: "Stationery", qty: 5, reorder: 20, price: 4.25 },
  { id: "ITM-007", name: "Webcam HD", category: "Electronics", qty: 18, reorder: 10, price: 89.99 },
  { id: "ITM-008", name: "Desk Organizer", category: "Office", qty: 3, reorder: 5, price: 22.50 },
  { id: "ITM-009", name: "Cleaning Kit", category: "Maintenance", qty: 30, reorder: 10, price: 14.75 },
  { id: "ITM-010", name: "Label Maker", category: "Office", qty: 7, reorder: 3, price: 55.00 },
];

const INITIAL_MOVEMENTS = [
  { id: "MOV-001", itemId: "ITM-001", itemName: "Wireless Keyboard", type: "inbound", qty: 50, date: "2026-05-20" },
  { id: "MOV-002", itemId: "ITM-004", itemName: "USB-C Hub", type: "outbound", qty: 15, date: "2026-05-22" },
  { id: "MOV-003", itemId: "ITM-003", itemName: "A4 Paper Ream", type: "outbound", qty: 42, date: "2026-05-25" },
  { id: "MOV-004", itemId: "ITM-007", itemName: "Webcam HD", type: "inbound", qty: 18, date: "2026-05-28" },
  { id: "MOV-005", itemId: "ITM-002", itemName: "Ergonomic Chair", type: "outbound", qty: 3, date: "2026-05-30" },
];

function getStatus(qty, reorder) {
  if (qty === 0) return "out";
  if (qty <= reorder) return "low";
  return "in";
}

export default function AlKhazen() {
  const [lang, setLang] = useState("en");
  const [currency, setCurrency] = useState("$");
  const [vatRate, setVatRate] = useState(15);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [movements, setMovements] = useState(INITIAL_MOVEMENTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);

  // Modals
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddMovement, setShowAddMovement] = useState(false);
  const [showQuickAction, setShowQuickAction] = useState(null); // {type:'dispatch'|'receive', item}
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [settingsTemp, setSettingsTemp] = useState({ currency: "$", vat: 15 });

  // Form states
  const [newItem, setNewItem] = useState({ id: "", name: "", category: "", qty: "", reorder: "", price: "" });
  const [newMovement, setNewMovement] = useState({ itemId: "", type: "inbound", qty: "" });
  const [quickQty, setQuickQty] = useState("");
  const [quickError, setQuickError] = useState("");

  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ar";

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(items.map(i => i.category))];
    return cats;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === "all" || item.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [items, search, categoryFilter]);

  const stats = useMemo(() => {
    const totalValue = items.reduce((acc, i) => acc + i.qty * i.price, 0);
    const low = items.filter(i => i.qty > 0 && i.qty <= i.reorder).length;
    const out = items.filter(i => i.qty === 0).length;
    return { total: items.length, totalValue, low, out };
  }, [items]);

  const generateId = (prefix, list) => {
    const num = String(list.length + 1).padStart(3, "0");
    return `${prefix}-${num}`;
  };

  const handleSaveItem = () => {
    if (!newItem.name || !newItem.category || newItem.qty === "" || newItem.reorder === "" || newItem.price === "") return;
    if (editingItem) {
      setItems(prev => prev.map(i => i.id === editingItem.id ? {
        ...i, name: newItem.name, category: newItem.category,
        qty: Number(newItem.qty), reorder: Number(newItem.reorder), price: Number(newItem.price)
      } : i));
    } else {
      const id = newItem.id || generateId("ITM", items);
      setItems(prev => [...prev, {
        id, name: newItem.name, category: newItem.category,
        qty: Number(newItem.qty), reorder: Number(newItem.reorder), price: Number(newItem.price)
      }]);
    }
    setNewItem({ id: "", name: "", category: "", qty: "", reorder: "", price: "" });
    setShowAddItem(false);
    setEditingItem(null);
    showToast(t.itemSaved);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({ id: item.id, name: item.name, category: item.category, qty: item.qty, reorder: item.reorder, price: item.price });
    setShowAddItem(true);
  };

  const handleDeleteItem = (itemId) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
    setShowDeleteConfirm(null);
    showToast("Item deleted", "error");
  };

  const handleAddMovement = () => {
    if (!newMovement.itemId || !newMovement.qty) return;
    const item = items.find(i => i.id === newMovement.itemId);
    if (!item) return;
    const qty = Number(newMovement.qty);
    if (newMovement.type === "outbound" && qty > item.qty) {
      showToast(t.notEnoughStock, "error"); return;
    }
    const movId = generateId("MOV", movements);
    const today = new Date().toISOString().split("T")[0];
    setMovements(prev => [...prev, { id: movId, itemId: item.id, itemName: item.name, type: newMovement.type, qty, date: today }]);
    setItems(prev => prev.map(i => i.id === item.id ? {
      ...i, qty: newMovement.type === "inbound" ? i.qty + qty : i.qty - qty
    } : i));
    setNewMovement({ itemId: "", type: "inbound", qty: "" });
    setShowAddMovement(false);
    showToast(t.movementSuccess);
  };

  const handleQuickAction = () => {
    const qty = Number(quickQty);
    if (!qty || qty <= 0) return;
    const { type, item } = showQuickAction;
    if (type === "dispatch" && qty > item.qty) { setQuickError(t.notEnoughStock); return; }
    const movId = generateId("MOV", movements);
    const today = new Date().toISOString().split("T")[0];
    setMovements(prev => [...prev, { id: movId, itemId: item.id, itemName: item.name, type: type === "dispatch" ? "outbound" : "inbound", qty, date: today }]);
    setItems(prev => prev.map(i => i.id === item.id ? {
      ...i, qty: type === "dispatch" ? i.qty - qty : i.qty + qty
    } : i));
    setShowQuickAction(null);
    setQuickQty("");
    setQuickError("");
    showToast(t.movementSuccess);
  };

  const handleExportCSV = () => {
    const headers = [t.itemCode, t.itemName, t.category, t.quantity, t.reorderPoint, t.price, t.status];
    const rows = items.map(i => [i.id, i.name, i.category, i.qty, i.reorder, i.price, getStatus(i.qty, i.reorder)]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "alkhazen_inventory.csv"; a.click();
  };

  const handleSaveSettings = () => {
    setCurrency(settingsTemp.currency);
    setVatRate(Number(settingsTemp.vat));
    showToast("Settings saved");
  };

  const navItems = [
    { key: "dashboard", icon: LayoutDashboard, label: t.dashboard },
    { key: "items", icon: Package, label: t.items },
    { key: "movements", icon: Activity, label: t.movements },
    { key: "reports", icon: BarChart2, label: t.reports },
    { key: "settings", icon: Settings, label: t.settings },
  ];

  const statusBadge = (qty, reorder) => {
    const s = getStatus(qty, reorder);
    if (s === "out") return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">{t.outOfStockLabel}</span>;
    if (s === "low") return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">{t.lowStockLabel}</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">{t.inStock}</span>;
  };

  const rowBg = (qty, reorder) => {
    const s = getStatus(qty, reorder);
    if (s === "out") return "bg-red-50 border-l-4 border-red-400";
    if (s === "low") return "bg-amber-50 border-l-4 border-amber-400";
    return "border-l-4 border-transparent";
  };

  // Dashboard Stats Cards
  const StatCard = ({ icon: Icon, label, value, color, subtext }) => (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-start gap-4`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-black text-slate-800 mt-0.5">{value}</p>
        {subtext && <p className="text-xs text-slate-400 mt-0.5">{subtext}</p>}
      </div>
    </div>
  );

  // Stock health bar
  const inCount = items.filter(i => getStatus(i.qty, i.reorder) === "in").length;
  const lowCount = items.filter(i => getStatus(i.qty, i.reorder) === "low").length;
  const outCount = items.filter(i => getStatus(i.qty, i.reorder) === "out").length;
  const total = items.length || 1;

  // Top items by value
  const topItems = [...items].sort((a, b) => (b.qty * b.price) - (a.qty * a.price)).slice(0, 5);
  const maxVal = topItems[0] ? topItems[0].qty * topItems[0].price : 1;

  const fontFamily = isRTL ? "'Tajawal', sans-serif" : "'DM Sans', sans-serif";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{ fontFamily, minHeight: "100vh" }}
      className="bg-slate-50 text-slate-800 flex"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        input:focus, select:focus, textarea:focus { outline: none; }
        .sidebar-item { transition: all 0.15s ease; }
        .sidebar-item:hover { background: rgba(99,102,241,0.08); }
        .sidebar-item.active { background: rgba(99,102,241,0.12); color: #6366f1; }
        .btn-primary { background: linear-gradient(135deg, #6366f1, #8b5cf6); transition: all 0.15s; }
        .btn-primary:hover { background: linear-gradient(135deg, #4f46e5, #7c3aed); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99,102,241,0.35); }
        .card-hover { transition: all 0.15s; }
        .card-hover:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-1px); }
        .modal-overlay { animation: fadeIn 0.15s ease; }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        .modal-box { animation: slideUp 0.2s ease; }
        @keyframes slideUp { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform: translateY(0) } }
        .toast { animation: toastIn 0.25s ease; }
        @keyframes toastIn { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform: translateY(0) } }
        table { border-collapse: collapse; }
        th { font-weight: 600; letter-spacing: 0.02em; }
        .bar-fill { transition: width 0.6s ease; }
      `}</style>

      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} bg-white border-e border-slate-100 shadow-sm flex flex-col transition-all duration-200 shrink-0 z-20`} style={{ minHeight: "100vh" }}>
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-100 ${!sidebarOpen ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center shrink-0">
            <Warehouse size={18} className="text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="font-black text-slate-800 text-base leading-tight">{t.appName}</p>
              <p className="text-xs text-slate-400">{t.tagline}</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 ${activeSection === key ? "active" : ""} ${!sidebarOpen ? "justify-center" : ""}`}
            >
              <Icon size={18} className={activeSection === key ? "text-indigo-500" : "text-slate-400"} />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Lang Toggle */}
        {sidebarOpen && (
          <div className="px-3 pb-5 border-t border-slate-100 pt-4">
            <div className="flex rounded-xl overflow-hidden border border-slate-200">
              <button onClick={() => setLang("en")} className={`flex-1 py-1.5 text-xs font-semibold transition-colors ${lang === "en" ? "bg-indigo-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}>EN</button>
              <button onClick={() => setLang("ar")} className={`flex-1 py-1.5 text-xs font-semibold transition-colors ${lang === "ar" ? "bg-indigo-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}>عر</button>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* TOPBAR */}
        <header className="bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(p => !p)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <Menu size={20} />
            </button>
            <h1 className="font-black text-slate-800 text-lg">{navItems.find(n => n.key === activeSection)?.label}</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Alert bell */}
            <div className="relative">
              <button className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                <Bell size={17} />
              </button>
              {(stats.low + stats.out) > 0 && (
                <span className="absolute -top-1 -end-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {stats.low + stats.out}
                </span>
              )}
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* ======================== DASHBOARD ======================== */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Package} label={t.totalItems} value={stats.total} color="bg-indigo-500" subtext={`${categories.length} categories`} />
                <StatCard icon={DollarSign} label={t.totalValue} value={`${currency}${stats.totalValue.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} color="bg-emerald-500" subtext={`+${vatRate}% VAT`} />
                <StatCard icon={AlertTriangle} label={t.lowStock} value={stats.low} color="bg-amber-500" subtext="Need reorder" />
                <StatCard icon={XCircle} label={t.outOfStock} value={stats.out} color="bg-red-500" subtext="Urgent" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stock Health */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Activity size={16} className="text-indigo-400" />{t.stockHealth}</h2>
                  <div className="space-y-3">
                    {[
                      { label: t.inStock, count: inCount, color: "bg-emerald-400", pct: Math.round(inCount / total * 100) },
                      { label: t.lowStockLabel, count: lowCount, color: "bg-amber-400", pct: Math.round(lowCount / total * 100) },
                      { label: t.outOfStockLabel, count: outCount, color: "bg-red-400", pct: Math.round(outCount / total * 100) },
                    ].map(({ label, count, color, pct }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-slate-600 font-medium">{label}</span>
                          <span className="text-slate-500">{count} <span className="text-slate-300">({pct}%)</span></span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div className={`${color} h-2.5 rounded-full bar-fill`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Items by Value */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-indigo-400" />{t.assetBreakdown}</h2>
                  <div className="space-y-3">
                    {topItems.map((item, idx) => {
                      const val = item.qty * item.price;
                      const pct = Math.round(val / maxVal * 100);
                      return (
                        <div key={item.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600 font-medium truncate max-w-[60%]">{item.name}</span>
                            <span className="text-slate-700 font-bold">{currency}{val.toFixed(2)}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div className="h-2 rounded-full bar-fill bg-indigo-400" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Movements */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-bold text-slate-700 flex items-center gap-2"><RefreshCw size={16} className="text-indigo-400" />{t.recentActivity}</h2>
                  <span className="text-xs text-slate-400">{movements.length} {t.totalMovements}</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {[...movements].reverse().slice(0, 5).map(mov => (
                    <div key={mov.id} className="flex items-center gap-4 px-5 py-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${mov.type === "inbound" ? "bg-emerald-50" : "bg-red-50"}`}>
                        {mov.type === "inbound" ? <ArrowDownCircle size={16} className="text-emerald-500" /> : <ArrowUpCircle size={16} className="text-red-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{mov.itemName}</p>
                        <p className="text-xs text-slate-400">{mov.id} · {mov.date}</p>
                      </div>
                      <span className={`text-sm font-bold ${mov.type === "inbound" ? "text-emerald-600" : "text-red-500"}`}>
                        {mov.type === "inbound" ? "+" : "-"}{mov.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================== ITEMS ======================== */}
          {activeSection === "items" && (
            <div className="space-y-4">
              {/* Controls */}
              <div className="flex flex-wrap gap-3 items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 flex-wrap flex-1">
                  <div className="relative min-w-[200px] flex-1 max-w-xs">
                    <Search size={15} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? "end-3" : "start-3"}`} />
                    <input
                      className={`w-full bg-slate-50 border border-slate-200 rounded-xl text-sm py-2 text-slate-700 focus:border-indigo-400 focus:bg-white transition-colors ${isRTL ? "pe-9 ps-3" : "ps-9 pe-3"}`}
                      placeholder={t.search}
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Filter size={14} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? "end-3" : "start-3"}`} />
                    <select
                      className={`bg-slate-50 border border-slate-200 rounded-xl text-sm py-2 text-slate-600 focus:border-indigo-400 transition-colors appearance-none ${isRTL ? "pe-8 ps-3" : "ps-8 pe-3"}`}
                      value={categoryFilter}
                      onChange={e => setCategoryFilter(e.target.value)}
                    >
                      <option value="all">{t.filterByCategory}</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors">
                    <Download size={15} />{t.exportCSV}
                  </button>
                  <button onClick={() => window.print()} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors">
                    <Printer size={15} />{t.print}
                  </button>
                  <button
                    onClick={() => { setEditingItem(null); setNewItem({ id: "", name: "", category: "", qty: "", reorder: "", price: "" }); setShowAddItem(true); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-white text-sm font-semibold shadow"
                  >
                    <Plus size={15} />{t.addItem}
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {[t.itemCode, t.itemName, t.category, t.quantity, t.reorderPoint, t.price, t.status, t.actions].map(h => (
                          <th key={h} className="px-4 py-3 text-start text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.length === 0 ? (
                        <tr><td colSpan={8} className="text-center py-12 text-slate-400">No items found</td></tr>
                      ) : filteredItems.map(item => (
                        <tr key={item.id} className={`${rowBg(item.qty, item.reorder)} hover:bg-slate-50 transition-colors`}>
                          <td className="px-4 py-3 font-mono text-xs text-slate-500 font-medium">{item.id}</td>
                          <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{item.name}</td>
                          <td className="px-4 py-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">{item.category}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`font-bold text-base ${item.qty === 0 ? "text-red-600" : item.qty <= item.reorder ? "text-amber-600" : "text-slate-800"}`}>{item.qty}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-500">{item.reorder}</td>
                          <td className="px-4 py-3 font-semibold text-slate-700">{currency}{item.price.toFixed(2)}</td>
                          <td className="px-4 py-3">{statusBadge(item.qty, item.reorder)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => setShowQuickAction({ type: "receive", item })} className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors" title={t.receive}>
                                <ArrowDownCircle size={14} className="text-emerald-600" />
                              </button>
                              <button onClick={() => setShowQuickAction({ type: "dispatch", item })} className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors" title={t.dispatch}>
                                <ArrowUpCircle size={14} className="text-red-500" />
                              </button>
                              <button onClick={() => handleEditItem(item)} className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors">
                                <Edit2 size={13} className="text-slate-500" />
                              </button>
                              <button onClick={() => setShowDeleteConfirm(item)} className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-red-50 transition-colors">
                                <Trash2 size={13} className="text-slate-400 hover:text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{filteredItems.length} / {items.length} items</span>
                  <span>{t.totalValue}: <strong className="text-indigo-600">{currency}{stats.totalValue.toFixed(2)}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* ======================== MOVEMENTS ======================== */}
          {activeSection === "movements" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-3 h-3 rounded-full bg-emerald-400" /> {t.inbound}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-3 h-3 rounded-full bg-red-400" /> {t.outbound}
                  </div>
                </div>
                <button
                  onClick={() => setShowAddMovement(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-white text-sm font-semibold shadow"
                >
                  <Plus size={15} />{t.addMovement}
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {[t.movementNo, t.itemNameCol, t.operation, t.qtyMoved, t.date].map(h => (
                          <th key={h} className="px-4 py-3 text-start text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...movements].reverse().map(mov => (
                        <tr key={mov.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-slate-500">{mov.id}</td>
                          <td className="px-4 py-3 font-semibold text-slate-700">{mov.itemName}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${mov.type === "inbound" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                              {mov.type === "inbound" ? <ArrowDownCircle size={11} /> : <ArrowUpCircle size={11} />}
                              {mov.type === "inbound" ? t.inbound : t.outbound}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`font-bold ${mov.type === "inbound" ? "text-emerald-600" : "text-red-500"}`}>
                              {mov.type === "inbound" ? "+" : "-"}{mov.qty}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-500">{mov.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
                  {movements.length} {t.totalMovements}
                </div>
              </div>
            </div>
          )}

          {/* ======================== REPORTS ======================== */}
          {activeSection === "reports" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Package} label={t.totalItems} value={stats.total} color="bg-indigo-500" />
                <StatCard icon={DollarSign} label={t.totalValue} value={`${currency}${stats.totalValue.toFixed(2)}`} color="bg-emerald-500" />
                <StatCard icon={Activity} label={t.totalMovements} value={movements.length} color="bg-purple-500" />
                <StatCard icon={ShoppingCart} label="Inbound Total" value={movements.filter(m => m.type === "inbound").reduce((a, m) => a + m.qty, 0)} color="bg-sky-500" />
              </div>

              {/* Detailed Items Report */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-bold text-slate-700">{t.assetBreakdown}</h2>
                  <div className="flex gap-2">
                    <button onClick={handleExportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors font-medium">
                      <Download size={12} />{t.exportCSV}
                    </button>
                    <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors font-medium">
                      <Printer size={12} />{t.print}
                    </button>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {[...items].sort((a, b) => (b.qty * b.price) - (a.qty * a.price)).map(item => {
                    const val = item.qty * item.price;
                    const withVat = val * (1 + vatRate / 100);
                    const pct = Math.round(val / (stats.totalValue || 1) * 100);
                    return (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-28 text-xs text-slate-500 truncate shrink-0">{item.name}</div>
                        <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div className="h-3 bg-indigo-400 rounded-full bar-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="w-24 text-end shrink-0">
                          <p className="text-xs font-bold text-slate-700">{currency}{val.toFixed(2)}</p>
                          <p className="text-[10px] text-slate-400">+VAT: {currency}{withVat.toFixed(2)}</p>
                        </div>
                        <div className="w-10 text-end shrink-0 text-xs text-slate-400">{pct}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Movement Summary */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-bold text-slate-700">Movement Summary</h2>
                </div>
                <div className="grid grid-cols-2 divide-x divide-slate-100">
                  <div className="p-6 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">{t.inbound}</p>
                    <p className="text-4xl font-black text-emerald-500">{movements.filter(m => m.type === "inbound").reduce((a, m) => a + m.qty, 0)}</p>
                    <p className="text-xs text-slate-400 mt-1">{movements.filter(m => m.type === "inbound").length} transactions</p>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">{t.outbound}</p>
                    <p className="text-4xl font-black text-red-500">{movements.filter(m => m.type === "outbound").reduce((a, m) => a + m.qty, 0)}</p>
                    <p className="text-xs text-slate-400 mt-1">{movements.filter(m => m.type === "outbound").length} transactions</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================== SETTINGS ======================== */}
          {activeSection === "settings" && (
            <div className="max-w-lg">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h2 className="font-bold text-slate-800 text-base">{t.settingsTitle}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Configure your system preferences</p>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">{t.language}</label>
                    <div className="flex rounded-xl overflow-hidden border border-slate-200 w-fit">
                      <button onClick={() => setLang("en")} className={`px-5 py-2 text-sm font-semibold transition-colors ${lang === "en" ? "bg-indigo-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}>English</button>
                      <button onClick={() => setLang("ar")} className={`px-5 py-2 text-sm font-semibold transition-colors ${lang === "ar" ? "bg-indigo-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}>العربية</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">{t.currency}</label>
                    <div className="flex gap-2 flex-wrap">
                      {["$", "€", "£", "¥", "SAR", "AED", "KWD", "EGP"].map(sym => (
                        <button
                          key={sym}
                          onClick={() => setSettingsTemp(p => ({ ...p, currency: sym }))}
                          className={`px-3 py-1.5 rounded-xl text-sm font-bold border transition-colors ${settingsTemp.currency === sym ? "bg-indigo-500 text-white border-indigo-500" : "border-slate-200 text-slate-600 hover:border-indigo-300"}`}
                        >{sym}</button>
                      ))}
                    </div>
                    <input
                      className="mt-2 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:border-indigo-400 transition-colors w-28"
                      placeholder="Custom..."
                      value={settingsTemp.currency}
                      onChange={e => setSettingsTemp(p => ({ ...p, currency: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">{t.vat}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:border-indigo-400 transition-colors w-24"
                        value={settingsTemp.vat}
                        onChange={e => setSettingsTemp(p => ({ ...p, vat: e.target.value }))}
                      />
                      <span className="text-slate-500 text-sm font-medium">%</span>
                      <span className="text-xs text-slate-400">Current: {vatRate}%</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button onClick={handleSaveSettings} className="btn-primary text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow">
                      {t.save}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================== MODAL: ADD/EDIT ITEM ======================== */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md modal-box">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-black text-slate-800">{editingItem ? t.edit : t.addItemTitle}</h3>
              <button onClick={() => { setShowAddItem(false); setEditingItem(null); }} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: t.itemCode, key: "id", placeholder: "e.g. ITM-011", type: "text", disabled: !!editingItem },
                { label: t.itemName, key: "name", placeholder: "Product name", type: "text" },
                { label: t.category, key: "category", placeholder: "e.g. Electronics", type: "text" },
                { label: t.quantity, key: "qty", placeholder: "0", type: "number" },
                { label: t.reorderPoint, key: "reorder", placeholder: "Min quantity", type: "number" },
                { label: t.price, key: "price", placeholder: "0.00", type: "number" },
              ].map(({ label, key, placeholder, type, disabled }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
                  <input
                    type={type}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-400 transition-colors ${disabled ? "bg-slate-50 text-slate-400" : "bg-white"}`}
                    placeholder={placeholder}
                    value={newItem[key]}
                    onChange={e => setNewItem(p => ({ ...p, [key]: e.target.value }))}
                    disabled={disabled}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => { setShowAddItem(false); setEditingItem(null); }} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">{t.cancel}</button>
              <button onClick={handleSaveItem} className="flex-1 py-2.5 rounded-xl btn-primary text-white text-sm font-semibold shadow">{t.save}</button>
            </div>
          </div>
        </div>
      )}

      {/* ======================== MODAL: ADD MOVEMENT ======================== */}
      {showAddMovement && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm modal-box">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-black text-slate-800">{t.addMovementTitle}</h3>
              <button onClick={() => setShowAddMovement(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{t.selectItem}</label>
                <select
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-400 transition-colors"
                  value={newMovement.itemId}
                  onChange={e => setNewMovement(p => ({ ...p, itemId: e.target.value }))}
                >
                  <option value="">{t.selectItem}</option>
                  {items.map(i => <option key={i.id} value={i.id}>{i.name} ({t.currentQty}: {i.qty})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{t.selectOperation}</label>
                <div className="flex rounded-xl overflow-hidden border border-slate-200">
                  <button onClick={() => setNewMovement(p => ({ ...p, type: "inbound" }))} className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${newMovement.type === "inbound" ? "bg-emerald-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
                    <ArrowDownCircle size={14} />{t.inbound}
                  </button>
                  <button onClick={() => setNewMovement(p => ({ ...p, type: "outbound" }))} className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${newMovement.type === "outbound" ? "bg-red-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
                    <ArrowUpCircle size={14} />{t.outbound}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{t.qtyMoved}</label>
                <input
                  type="number"
                  min={1}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-400 transition-colors"
                  placeholder="Enter quantity"
                  value={newMovement.qty}
                  onChange={e => setNewMovement(p => ({ ...p, qty: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowAddMovement(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">{t.cancel}</button>
              <button onClick={handleAddMovement} className="flex-1 py-2.5 rounded-xl btn-primary text-white text-sm font-semibold shadow">{t.confirm}</button>
            </div>
          </div>
        </div>
      )}

      {/* ======================== MODAL: QUICK ACTION ======================== */}
      {showQuickAction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm modal-box">
            <div className={`px-6 pt-6 pb-4 rounded-t-2xl ${showQuickAction.type === "dispatch" ? "bg-red-50" : "bg-emerald-50"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${showQuickAction.type === "dispatch" ? "bg-red-500" : "bg-emerald-500"}`}>
                  {showQuickAction.type === "dispatch" ? <ArrowUpCircle size={18} className="text-white" /> : <ArrowDownCircle size={18} className="text-white" />}
                </div>
                <div>
                  <h3 className="font-black text-slate-800">{showQuickAction.type === "dispatch" ? t.dispatch : t.receive}</h3>
                  <p className="text-xs text-slate-500">{showQuickAction.item.name}</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-sm bg-slate-50 rounded-xl p-3">
                <span className="text-slate-500">{t.currentQty}</span>
                <span className="font-bold text-slate-800">{showQuickAction.item.qty}</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  {showQuickAction.type === "dispatch" ? t.dispatchQty : t.receiveQty}
                </label>
                <input
                  type="number"
                  min={1}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-400 transition-colors"
                  placeholder="Enter quantity"
                  value={quickQty}
                  onChange={e => { setQuickQty(e.target.value); setQuickError(""); }}
                  autoFocus
                />
                {quickError && <p className="text-xs text-red-500 mt-1.5 font-medium">{quickError}</p>}
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => { setShowQuickAction(null); setQuickQty(""); setQuickError(""); }} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">{t.cancel}</button>
              <button
                onClick={handleQuickAction}
                className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold shadow transition-all ${showQuickAction.type === "dispatch" ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"}`}
              >{t.confirm}</button>
            </div>
          </div>
        </div>
      )}

      {/* ======================== MODAL: DELETE CONFIRM ======================== */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs modal-box text-center p-6">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="font-black text-slate-800 mb-2">{t.delete} Item?</h3>
            <p className="text-sm text-slate-500 mb-6">"{showDeleteConfirm.name}" will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">{t.cancel}</button>
              <button onClick={() => handleDeleteItem(showDeleteConfirm.id)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">{t.delete}</button>
            </div>
          </div>
        </div>
      )}

      {/* ======================== TOAST ======================== */}
      {toast && (
        <div className={`fixed bottom-6 ${isRTL ? "start-6" : "end-6"} z-50 toast`}>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-semibold ${toast.type === "error" ? "bg-red-500 text-white" : "bg-slate-800 text-white"}`}>
            {toast.type === "error" ? <AlertTriangle size={15} /> : <CheckCircle size={15} />}
            {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
}
