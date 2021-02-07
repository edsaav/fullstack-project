FactoryBot.define do
  factory :gif do
    external_id { Faker::Alphanumeric.alphanumeric(number: 16) }
    title { Faker::Lorem.sentence }
    url_large { Faker::Internet.url }
    url_small { Faker::Internet.url }
  end
end
