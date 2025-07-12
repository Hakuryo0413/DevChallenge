FactoryBot.define do
  factory :test_case do
    input { "1" }
    expect_output { "1" }
    is_hidden { false }
    question
  end
end
