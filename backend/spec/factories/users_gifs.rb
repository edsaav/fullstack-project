FactoryBot.define do
  factory :users_gif do
    user { create :user }
    gif { create :gif }
  end
end
