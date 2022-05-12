const dummy = (blogs) => {
    if (typeof blogs === 'object') {
        return 1
    } else {
        return 0
    }
}

const totalLikes = (blogs) => {
    const like = blogs.reduce((x, y) => x + y.likes, 0)

    return ( blogs.length === 0 ) ? 0 : like
}

module.exports = {
    dummy,
    totalLikes
}