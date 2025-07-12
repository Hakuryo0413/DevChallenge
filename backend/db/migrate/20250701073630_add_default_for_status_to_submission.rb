class AddDefaultForStatusToSubmission < ActiveRecord::Migration[7.2]
  def change
    change_column_default :submissions, :status, "Pending"
  end
end
