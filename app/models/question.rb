class Question < ApplicationRecord
  belongs_to :challenge
  has_many :submissions
  has_many :test_cases, dependent: :destroy
  accepts_nested_attributes_for :test_cases
end
