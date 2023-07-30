// @ts-nocheck
import { Secret } from 'domain/secret/Secret'
import { expect, test } from 'vitest'

const VALID_SECRET = {
  age: 12,
  tags: ['abcdefg','abcdefg','abcdefg'],
  gender: 'man',
  secret: 'secret',
  likes: 0,
  dislikes: 0
} 

test('secret should be defined', () => {
  expect(VALID_SECRET).toBeDefined()
})

test('should have all properties', () => {
  expect(VALID_SECRET).toHaveProperty('age')
  expect(VALID_SECRET).toHaveProperty('tags')
  expect(VALID_SECRET).toHaveProperty('gender')
  expect(VALID_SECRET).toHaveProperty('secret')
  expect(VALID_SECRET).toHaveProperty('likes')
  expect(VALID_SECRET).toHaveProperty('dislikes')
})

// Age validation
test('should throw an error if age is not a number', () => {
  expect(() => new Secret({ tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: '', tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: true, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 0n, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: null, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: [], tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: () => {}, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: {}, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.age = ''
  }).toThrow()
  expect(() => new Secret(VALID_SECRET)).not.toThrow()
})

test('should throw an error if age is less than 12', () => {
  expect(() => new Secret({ age: 10, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.age = 10
  }).toThrow()
})

test('should throw an error if age is greater than 99', () => {
  expect(() => new Secret({ age: 100, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.age = 100
  }).toThrow()
})

test('should throw an error if age is not a positive integer', () => {
  expect(() => new Secret({ age: -1, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 1.2, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.age = -1
  }).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.age = 1.2
  }).toThrow()
})

// Tags validation
test('should throw an error if tags is not a string', () => {
  expect(() => new Secret({ age: 12, gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: {}, gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: () => {}, gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: 0, gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: 0n, gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: true, gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: null, gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.tags = ''
  }).toThrow()
  expect(() => new Secret(VALID_SECRET)).not.toThrow()
})

test('should throw an error if tags is longer than 35 characters', () => {
  expect(() => new Secret({ age: 12, tags: 'a'.repeat(36), gender: '', secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.tags = 'a'.repeat(36)
  }).toThrow()
})

// Gender validation
test('should throw an error if gender is not a string', () => {
  expect(() => new Secret({ age: 12, tags: [''], secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: 1, secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: true, secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: () => {}, secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: {}, secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: [], secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: null, secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: 0n, secret: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.gender = 2
  }).toThrow()
  expect(() => new Secret(VALID_SECRET)).not.toThrow()
})

//Secret validation
test('should throw an error if secret is not a string', () => {
  expect(() => new Secret({ age: 12, tags: [''], gender: '', likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: () => {}, likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: 0, likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: 0n, likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: [], likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: {}, likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: null, likes: 0, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: true, likes: 0, dislikes: 0 })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.secret = 1
  }).toThrow()
  expect(() => new Secret(VALID_SECRET)).not.toThrow()
})

test('should throw an error if secret is longer than 420 characters', () => {
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: 'a'.repeat(421), likes: 0, dislikes: 0 })).toThrow()
})

// Likes validation
test('should throw an error if likes is not a number', () => {
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: true, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: '', dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0n, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: {}, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: [], dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: () => {}, dislikes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: null, dislikes: 0 })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.likes = ''
  }).toThrow()
  expect(() => new Secret(VALID_SECRET)).not.toThrow()
})

test('should throw an error if likes is different from 0', () => {
  const secret = new Secret(VALID_SECRET)
  expect(() => secret.likes = 1).toThrow()
  expect(() => secret.likes = -1).toThrow()
  expect(() => secret.likes = 0).not.toThrow()
})

// Dislikes validation
test('should throw an error if dislikes is not a number', () => {
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0 })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0, dislikes: 0n })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0, dislikes: true })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0, dislikes: null })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0, dislikes: {} })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0, dislikes: () => {} })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0, dislikes: [] })).toThrow()
  expect(() => new Secret({ age: 12, tags: [''], gender: '', secret: '', likes: 0, dislikes: '' })).toThrow()
  expect(() => {
    const secret = new Secret(VALID_SECRET)
    secret.dislikes = ''
  }).toThrow()
  expect(() => new Secret(VALID_SECRET)).not.toThrow()
})

test('should throw an error if dislikes is different from 0', () => {
  const secret = new Secret(VALID_SECRET)
  expect(() => secret.dislikes = 1).toThrow()
  expect(() => secret.dislikes = -1).toThrow()
  expect(() => secret.dislikes = 0).not.toThrow()
})

// Test all properties
test('should throw an error if all properties are invalid', () => {
  expect(() => new Secret({ age: '', tags: 0, gender: 'cat', secret: 0, likes: 1, dislikes: 1 })).toThrow()
  expect(() => new Secret(VALID_SECRET)).not.toThrow()
})
