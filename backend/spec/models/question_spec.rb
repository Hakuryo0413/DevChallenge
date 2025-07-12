require 'rails_helper'

RSpec.describe Question, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:challenge) { FactoryBot.create(:challenge, user: user) }
  let(:question) { FactoryBot.create(:question, challenge: challenge) }

  context "challenge association" do
    it "returns the associated challenge" do
      expect(question.challenge).to eq(challenge)  # dòng belongs_to :challenge được chạy tại đây
    end
  end
end
