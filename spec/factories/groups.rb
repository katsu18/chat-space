FactoryBot.define do
  factory :group do
    name {Faker::Movies::StarWars.name}
  end
end