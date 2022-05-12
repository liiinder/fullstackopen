const { dummy, totalLikes } = require('../utils/list_helpers')

test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        expect(totalLikes([{ likes: 10 }])).toBe(10)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            { likes: 13 },
            { likes: 17 },
            { likes: 42 },
            { likes: 28 }
        ]

        expect(totalLikes(blogs)).toBe(100)
    })
})