const userRightsKeyMap = new Map();
userRightsKeyMap.set("DELETE", "canDelete");
userRightsKeyMap.set("ADD", "canAdd");
userRightsKeyMap.set("EDIT", "canEdit");

/**
 *
 * @param {string} action
 * @returns key string
 */
function getUserRightKey(action) {
    return userRightsKeyMap.has(action) ? userRightsKeyMap.get(action) : false;
}

export { getUserRightKey };
