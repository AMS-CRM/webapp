const getInitials = (str) => {
    const s = str.split(" ")
    const i = s[0].substr(0, 1) + s[1].substr(0, 1)
    return i.toUpperCase()
}

export default getInitials;