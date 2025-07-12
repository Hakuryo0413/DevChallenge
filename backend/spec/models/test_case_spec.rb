
require 'rails_helper'

RSpec.describe TestCase, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:challenge) { FactoryBot.create(:challenge, user: user) }
  let(:question) { FactoryBot.create(:question, challenge: challenge) }
  let(:test_case) { FactoryBot.create(:test_case, question: question) }

  context "question association" do
    it "returns the associated question" do
      expect(test_case.question).to eq(question)
    end
  end
end
