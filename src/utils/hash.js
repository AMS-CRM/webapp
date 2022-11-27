export const hash = (str, max = 5) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.round(max * Math.abs(hash) / 2147483648);
}

