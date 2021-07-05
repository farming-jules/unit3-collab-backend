const bcrypt = require("bcrypt")
const { Faker } = require('fakergem')
const { User, UserImage, Like } = require('../models')

module.exports = {
  up: async () => {
    await User.destroy({ truncate: true })
    await UserImage.destroy({ truncate: true })
    await Like.destroy({ truncate: true })

    for (let i = 0; i < 20; i++) {
      const a = await User.create({
        userId: Faker.Number.number(),
        email: `${i}@test.com`,
        passwordHash: await bcrypt.hash('123456', 10),
        firstName: Faker.Name.name(),
        dateOfBirth: Faker.date.between('1960-01-01', '2005-12-31'),
        gender: Faker.Random.element([M, F, other])
        sexualOrientation: Faker.Random.element([Men, Women, other])
        passion: Faker.Pokemon.name(),
        lookingFor: Faker.Book.genre(),
        location: Faker.Address.city(),
        Bio: Faker.Lorem.sentence(2)
        UserImage: [
          {
            image: Faker.LoremPixel.image("300x300")
          }, {
            image: Faker.LoremPixel.image("300x300")
          }
        ],
        Like: [
          {
            OwnerId: Faker.Number.number(),
            TargetId: Faker.Number.number(),
            like: Faker.Boolean.boolean()
          }
        ]
      }, {
        include: {
          association: User.UserImage,
          association: User.Like
        }
      })
    }
  },
}