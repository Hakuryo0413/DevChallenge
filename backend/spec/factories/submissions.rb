FactoryBot.define do
  factory :submission do
    code { "print(1)" }
    status { "Accepted" }
    question
    user
  end
end
