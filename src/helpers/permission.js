export function isPermitted(route) {
    let permissions = JSON.parse(localStorage.getItem('permissions'));
    if (route === "/products") {
        if (permissions?.getProducts)
            return true;
    } else if (route === "/saleopprotunity") {
        if (permissions?.saleOpprotunity)
            return true;
    } else if (route === "/orders") {
        if (permissions?.getOrders)
            return true;
    } else if (route === "/customers") {
        if (permissions?.getCustomers)
            return true;
    } else if (route === "/reminders") {
        if (permissions?.reminder)
            return true;
    } else if (route === "/discounts") {
        if (permissions?.getDiscounts)
            return true;
    } else if (route === "/order/add") {
        if (permissions?.addOrder)
            return true;
    } else if (route === "/employees" || route === "/employee/add" || route === "/employees/add") {
        if (permissions?.getEmployees)
            return true;
    } else if (route === "/finance" || route === "/bills" || route === "/finance/bills") {
        if (permissions?.finance)
            return true;
    } else if (route === "/setting") {
        return true
    }
    else if (['/', '/register', '/dashboard', '/account', '/factor/add', '/factors', '/suppliers'].includes(route))
        return true;

    return false;
}