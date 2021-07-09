const bcrypt = require("bcrypt")
const { Faker } = require('fakergem')
const { User, UserImage, Like } = require('../models')

module.exports = {
  up: async () => {
    await User.destroy({ truncate: true })
    await UserImage.destroy({ truncate: true })
    await Like.destroy({ truncate: true })

    const userIds = []

    for (let i = 0; i < 20; i++) {
      const user = await User.create({
        email: `${i}@test.com`,
        passwordHash: await bcrypt.hash('123456', 10),
        name: Faker.Name.name(),
        dateOfBirth: Faker.Date.between(new Date(1960, 1, 1), new Date(2005, 12, 31)),
        gender: Faker.Random.element(['M', 'F', 'other']),
        sexualOrientation: Faker.Random.element(['Men', 'Women', 'other']),
        passion: Faker.Pokemon.name(),
        lookingFor: Faker.Random.element(['Men', 'Women', 'Everyone']),
        location: Faker.Random.element(['HK', 'Tokyo', 'London']),
        Bio: Faker.Lorem.sentence(2),
        UserImages: [
          {
            image: Faker.LoremPixel.image("300x300")
          }, {
            image: Faker.LoremPixel.image("300x300")
          }
        ]
      }, {
        include: User.UserImages
      })

      userIds.push(user.id)
    }

    for (let i = 0; i < 100; i++) {
      await Like.create({
        OwnerId: Faker.Random.element(userIds),
        TargetId: Faker.Random.element(userIds),
        like: Faker.Boolean.boolean(0.5)
      })
    }

    await Like.create({
      OwnerId: userIds[0],
      TargetId: userIds[1],
      like: true
    })

    await Like.create({
      OwnerId: userIds[1],
      TargetId: userIds[0],
      like: true
    })
  }
}


