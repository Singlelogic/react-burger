export function parseData(data) {
  let groupData = {};

  for (const item of data) {
    const type = item.type;
    if (!(type in groupData)) groupData[type] = [];
    groupData[type].push(item);
  }

  return groupData;
}
