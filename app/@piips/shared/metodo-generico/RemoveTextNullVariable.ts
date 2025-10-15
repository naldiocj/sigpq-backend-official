function removeTextNullVariable(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            result[key] = ['','null', undefined, 'undefined', '0'].includes(value) ? null : value;
        }
    }
    return result;
}

module.exports = removeTextNullVariable
