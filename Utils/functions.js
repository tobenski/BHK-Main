export const findMatches = (regex, str, matches = []) => {
    const res = regex.exec(str)
    res && matches.push(res) && findMatches(regex, str, matches)
    return matches
}

export const getTidspunkt = (date, time) => {
    return new Date(
        date.slice(0, 4),
        date.slice(4, 6) - 1,
        date.slice(6),
        time.slice(0, 2),
        time.slice(3, 5)
    )
}
