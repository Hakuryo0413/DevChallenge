class TestCase < ApplicationRecord
  belongs_to :question
  validates :input, presence: true
  validates :expect_output, presence: true
end
