
const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "داشبورد",
        layout: "/",
    },
    {
        path: "/order/add",
        name: "ثبت سفارش",
        layout: "/",
    },
    {
        path: "/saleopprotunity",
        name: "فرصت سفارشات",
        layout: "/",
    },
    {
        path: "/orders",
        name: "سفارش ها",
        layout: "/",
    },
    {
        path: "/reminders",
        name: "یادآوری",
        layout: "/",
    },
    {
        path: "/products",
        name: "محصولات",
        layout: "/",
    },
    {
        path: "/finance",
        name: "مالی",
        layout: "/finance",
    },
    {
        path: "/bills",
        name: "هزینه های جاری",
        layout: "/finance",
    },
    {
        path: "/customers",
        name: "مشتریان",
        layout: "/",
    },
    {
        path: "/employees",
        name: "کارمندان",
        layout: "/",
    },
    // {
    //     path: "/employee/add",
    //     name: "درخواست ها",
    //     layout: "/",
    // },
    // {
    //     path: "/discounts",
    //     name: "تخفیف ها",
    //     layout: "/",
    // },
    {
        path: "/account",
        name: "حساب کاربری",
        layout: "/",
    }, {
        path: "/setting",
        name: "تنظیمات",
        layout: "/",
    }
];

export default dashboardRoutes;
