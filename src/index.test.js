import nock from 'nock'
import select from './index'
import { errors } from './constants'

describe('Tests', () => {
  it('should reject due to incorrect url usage', async () => {
    await expect(select({})).rejects.toEqual(errors.URL_REQUIRED)
  })

  it('should reject due to incorrect selectors usage', async () => {
    await expect(
      select({
        url: 'test.com'
      })
    ).rejects.toEqual(errors.SELECTORS_REQUIRED)
  })

  it('should reject due to incorrect callback usage', async () => {
    await expect(
      select({
        url: 'test.com',
        selectors: '.test.article'
      })
    ).rejects.toEqual(errors.CALLBACK_REQUIRED)
  })

  it('should reject due to incorrect selector to callback usage (one to many resolvers)', async () => {
    await expect(
      select({
        url: 'test.com',
        selectors: '.test.article',
        callbacks: [jest.fn(), jest.fn()]
      })
    ).rejects.toEqual(errors.MANY_TO_MANY)
  })

  it('should reject due to incorrect selector to callback usage (different size)', async () => {
    await expect(
      select({
        url: 'test.com',
        selectors: ['.test.article'],
        callbacks: [jest.fn(), jest.fn()]
      })
    ).rejects.toEqual(errors.MANY_TO_MANY_SIZE)
  })

  it('should reject due to server response', async () => {
    const serverError = {
      code: 404,
      message: 'not found'
    }

    nock('https://test.com')
      .get('/')
      .replyWithError(serverError)

    await expect(
      select({
        url: 'https://test.com',
        selectors: ['.test.article'],
        callbacks: [jest.fn()]
      })
    ).rejects.toEqual(serverError)
  })

  it("should fetch hackernews articles' titles (one to one)", async () => {
    const result = await select({
      url: 'https://news.ycombinator.com/',
      selectors: '.athing .title > a',
      callbacks: (cheerio, results) =>
        results.map((i, elem) => ({
          url: cheerio(elem).attr('href'),
          text: cheerio(elem)
            .text()
            .trim()
        }))
    })

    expect(result).toBeTruthy()
  })

  it("should fetch hackernews articles's numbering and titles (many to one)", async () => {
    const result = await select({
      url: 'https://news.ycombinator.com/',
      selectors: ['.athing .title > a', '.athing .title > span'],
      callbacks: (cheerio, results) =>
        results.map((i, elem) => ({
          text: cheerio(elem)
            .text()
            .trim()
        }))
    })

    expect(result).toBeTruthy()
  })

  it("should fetch hackernews articles's numbering and titles (many to many)", async () => {
    const result = await select({
      url: 'https://news.ycombinator.com/',
      selectors: ['.athing .title > a', '.athing .title > span'],
      callbacks: [
        (cheerio, results) =>
          results.map((i, elem) => ({
            text: cheerio(elem)
              .text()
              .trim()
          })),
        (cheerio, results) =>
          results.map((i, elem) => ({
            text: cheerio(elem)
              .text()
              .toUpperCase()
          }))
      ]
    })

    expect(result).toBeTruthy()
  })
})
