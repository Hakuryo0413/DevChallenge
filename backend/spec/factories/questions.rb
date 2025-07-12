FactoryBot.define do
  factory :question do
    title { "Sample question" }
    description { "A test question" }
    points { 100 }
    challenge
  end
end
