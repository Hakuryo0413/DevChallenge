class AddLanguageIdandInputToSubmission < ActiveRecord::Migration[7.2]
  def change
    add_column :submissions, :language_id, :integer
    add_column :submissions, :input, :text
  end
end
