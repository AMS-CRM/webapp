const getInitials = (str) => {
    const s = str.split(" ")

    if ( s.length == 0 ){ return str }
    const i = s[0].substr(0, 1) + s[1].substr(0, 1)
    return i.toUpperCase()
}

export default getInitials;