export function isPermitted(route) {
  let permissions = JSON.parse(localStorage.getItem("permissions"));
  let user_type = JSON.parse(localStorage.getItem('type'));


  if (route === "/products") {
    if (permissions?.getProducts) return true;
  } else if (route === "/saleopprotunity") {
    if (permissions?.saleOpprotunity) return true;
  } else if (route === "/orders") {
    if (permissions?.getOrders) return true;
  } else if (route === "/customers") {
    if (permissions?.getCustomers) return true;
  } else if (route === "/reminders") {
    if (permissions?.reminder) return true;
  } else if (route === "/discounts") {
    if (permissions?.getDiscounts) return false;
  } else if (route === "/order/add") {
    if (permissions?.addOrder) return true;
  } else if (route === "/employees"){
    if (permissions?.getEmployees) return true;
  } else if (route === "/employees/add"){
    if (permissions?.employeeRequests) return true;
  } else if (route === "/finance"){
    if (permissions?.finance) return true;
  } else if(route === "/finance/bills"){
    if (permissions?.currentCosts) return true;
  } else if (route === "/setting") {
    if(user_type == "1") return true;
  } else if (route === "/lead") {
    if (permissions?.leads) return true;
  } else if (route === "/factor") {
    if (permissions?.getReceipts) return true;
  } else if (route === "/factor/add") {
    if (permissions?.addReceipt) return true;
  } else if (route === "/factor/suppliers") {
    if (permissions?.getSuppliers) return true;
  } else if (route === "/factor/stock") {
    if (permissions?.getStock) return true;
  }else if (route === "/seller/add") {
   /*if (permissions?.getStock) */ return true;
  } else if (["/","/register","/dashboard","/account"].includes(route)){
    return true;
  } else
    return false;
}



export function getPermissionRoutesChilde(route) {
  let isOK = false;
  for(let a = 0 ; a < route.children.length ; a++ ){
     let res = isPermitted(route.children[a].path)
     if(res == true){
      isOK = true;
      break
     } 
  }
  return isOK
}