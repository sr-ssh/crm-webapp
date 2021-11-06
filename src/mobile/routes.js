
const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "خانه",
        layout: "/",
    },
    {
        path: "/lead",
        name: "سرنخ",
        layout: "/",
    },
    {
        path: "/order/add",
        name: "ثبت سفارش",
        layout: "/",
    },
    {
        path: "/saleopprotunity",
        name: "فرصت فروش",
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
        name: "محصول ها",
        layout: "/",
    },
    {
        layout: "/factor",
        path: "/factor",
        name: "لیست خرید",
        children: [
            {
                path: "/factor/add",
                name: "ثبت فاکتور",
                layout: "/",
            },
            {
                path: "/factor",
                name: "فاکتور ها",
                layout: "/",
            },
            {
                path: "/factor/suppliers",
                name: "تامین کننده ها",
                layout: "/",
            },
            {
                path: "/factor/stock",
                name: "مواد خام",
                layout: "/",
            }
        ]
    },
    {
        layout: "/finance",
        path: "/finance",
        name: "مالی",
        children: [{
            path: "/finance",
            name: "مالی",
            layout: "/finance",
        },
        {
            path: "/finance/bills",
            name: "هزینه های جاری",
            layout: "/finance",
        }]
    },
    {
        layout: "/seller",
        path: "/seller",
        name: "فروشندگان",
        children: [
            {
                path: "/seller/add",
                name: "ثبت فروشنده",
                layout: "/",
            },{
                path: "/seller/list",
                name: "فروشندگان",
                layout: "/",
            }
        ]
    },
    {
        path: "/customers",
        name: "مشتریان",
        layout: "/",
    },
    {
        layout: "/employees",
        path: "/employees",
        name: "کارمندان",
        children: [
            {
                path: "/employees",
                name: "کارمندان",
                layout: "/",
            },
            {
                path: "/employees/add",
                name: "درخواست ها",
                layout: "/employees",
            }]
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
    // {
    //     path: "/account",
    //     name: "حساب کاربری",
    //     layout: "/",
    // }, {
    //     path: "/setting",
    //     name: "تنظیمات",
    //     layout: "/",
    // }
];

export default dashboardRoutes;
