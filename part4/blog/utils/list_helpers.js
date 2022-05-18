const _ = require('lodash')

// Module for getting specific information from the database

const dummy = (blogs) => {
    if (typeof blogs === 'object') {
        return 1
    } else {
        return 0
    }
}

const totalLikes = (blogs) => {
    return blogs.reduce((x, y) => x + y.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((x, y) => x.likes > y.likes ? x : y )
}

const mostBlogs = (blogs) => {
    const authors = blogs.map( x => x.author )
    const countedBlogs = _.entries(_.countBy(authors)).map(([author, blogs]) => ({ author, blogs }))
    // const countedBlogs = _.values(_.groupBy(authors)).map(d => ({author: d[0], blogs: d.length}))

    return _.maxBy(countedBlogs, 'blogs')
}

const mostLikes = (blogs) => {
    const sortedList =
        _(blogs)
            .groupBy('author')
            .map((objs, key) => ({
                'author': key,
                'likes': _.sumBy(objs, 'likes') }))
            .orderBy(['likes', 'author'], ['desc', 'asc'])
            .value()

    return sortedList[0]

    // returns "{ author: 'Edsger W. Dijkstra', likes: 17 }"
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}