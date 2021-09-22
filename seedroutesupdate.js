const router = require('express').Router()
const { Post, User, Plant } = require('../models')

// users seed data to create 'dummy' users
let users = [
 {
  username: "johnDoe",
  password: "123"
 },
 {
  username: "janeDoe",
  password: "123"
 },
 {
  username: "jackDoe",
  password: "123"
 },
 {
  username: "jackieDoe",
  password: "123"
 }
]

// posts seed data to create 'dummy' posts from users above (all imgs are original content)
let posts = [
 {
  title: "Chinese Money Plant",
  photo: "",
  body: "This is also known as the UFO plant! Popular lore says that a Norwegian missionary took cuttings from a plant in China and brought it home - so now the plants are spread throughout Scandinavia.",
  uid: 1
 },
 {
  title: "Fiddle Leaf Fig Plant",
  photo: "",
  body: "Apparently this plant got it's name from the shape of their leaves! So cool!",
  uid: 2
 },
 {
  title: "Mini Tree?",
  photo: "",
  body: "I don't know what this is but it looks like a baby tree!",
  uid: 3
 },
 {
  title: "Pothos",
  photo: "",
  body: "I love pothos plants - easy to take care of and very versatile. I also hear it's easy to propogate so can't wait to try!",
  uid: 1
 },
 {
  title: "Snake Plant",
  photo: "",
  body: "I've heard the snake plant is one of few plants to release oxygen at night rather than in the day, and that the plant is drought tolerant. Only needs water every 2-3 weeks",
  uid: 4
 },
 {
  title: "ZZ Plant",
  photo: "",
  body: "Makes for a great desk plant or floor plant. Putting one on",
  uid: 4
 },
]