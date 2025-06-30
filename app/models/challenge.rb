class Challenge < ApplicationRecord
    belongs_to :user
    has_many :questions, dependent: :destroy

    validates :title, presence: true
    validates :start_date, presence: true
    validates :end_date, presence: true
end
