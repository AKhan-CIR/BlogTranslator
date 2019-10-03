require 'faker'
require 'securerandom'

Post.delete_all
User.delete_all


users_name= [ 
    'Asif',
    'Grace',
    'Genevive'
]


user_collection = []


users_name.each do |name|
        user_collection << User.create(name:name)
end

user_collection.each do |user|
    post_size = (SecureRandom.random_number(2) + 1).floor

    (1..post_size).each do |post|
        original = Faker::Movies::PrincessBride.quote
        Post.create(original: original ,user_id: user.id)
    end
end

