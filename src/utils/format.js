import store from "@/store";

/** 停车场类型 */
export function parkingType(value) {
  const data = store.state.config.parking_type_json[value];
  if (data) {
    return data.label;
  }
}

/** 年检 */
export function yearCheckType(value) {
  const data = store.state.config.year_check;
  const filterData = data.filter(item => item.subValue === value);
  if (filterData.length > 0) {
    return filterData[0].label;
  }
  return "";
}

/** 能源类型 */
export function energyType(value) {
  const data = store.state.config.energyType;
  const filterData = data.filter(item => item.value === parseInt(value)); //=== 结果值是否一致以及值类型，== 结果值是否一致
  if (filterData.length > 0) {
    return filterData[0].label;
  }
  return "";
}

// 获取指定属性的key的值
export function getCarsAttrKey(params) {
  if (!params.data) {
    return "";
  }
  // 格式化汽车属性数据
  const data = formatCarsAttr(params.data);
  // 判断数据，并返回
  if (data[params.parentKey] && data[params.parentKey][params.childKey]) {
    return data[params.parentKey][params.childKey];
  }
  return "";
}

// 格式化汽车属性
export function formatCarsAttr(val) {
  if (!val) {
    return "";
  }
  return JSON.parse(val);
}
