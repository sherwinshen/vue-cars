// ------------ cookies处理 ------------
import cookie from "cookie_js";

// 用于账户
const accountToKen = "account_toKen";
const accountName = "account_name";

export function setAccountToken(toKen) {
  return cookie.set(accountToKen, toKen);
}

export function getAccountToken() {
  return cookie.get(accountToKen);
}

export function removeAccountToken() {
  return cookie.remove(accountToKen);
}

export function setAccountName(value) {
  return cookie.set(accountName, value);
}

export function getAccountName() {
  return cookie.get(accountName);
}

export function removeAccountName() {
  return cookie.remove(accountName);
}

// 用于后台数据身份识别

const adminToKen = "admin_toKen";
const usernameKey = "username";

export function setAdminToken(toKen) {
  return cookie.set(adminToKen, toKen);
}

export function setAdminName(value) {
  return cookie.set(usernameKey, value);
}

export function getAdminName() {
  return cookie.get(usernameKey);
}

export function getAdminToken() {
  return cookie.get(adminToKen);
}
