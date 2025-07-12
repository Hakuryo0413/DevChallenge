FactoryBot.define do
  factory :challenge do
    title { "Sample challenge" }
    description { "A test challenge" }
    start_date { Date.today }
    end_date { Date.today + 7.days }
    user
  end
end
