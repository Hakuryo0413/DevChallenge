require 'rails_helper'

RSpec.describe Submission, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:challenge) { FactoryBot.create(:challenge, user: user) }
  let(:question) { FactoryBot.create(:question, challenge: challenge) }
  let(:submission) { FactoryBot.create(:submission, user: user, question: question) }

  context "user, question association" do
    it "returns the associated user" do
      expect(submission.user).to eq(user)
    end

    it "returns the associated question" do
      expect(submission.question).to eq(question)
    end
  end
end
