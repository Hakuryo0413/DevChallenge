class AddQuestionToSubmissions < ActiveRecord::Migration[7.2]
  def change
    add_reference :submissions, :question, null: false, foreign_key: true
  end
end
