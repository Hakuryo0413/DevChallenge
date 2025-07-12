class RemoveInputFromSubmission < ActiveRecord::Migration[7.2]
  def change
    remove_column :submissions, :input, :text
  end
end
