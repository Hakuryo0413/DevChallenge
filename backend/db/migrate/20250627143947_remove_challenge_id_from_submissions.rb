class RemoveChallengeIdFromSubmissions < ActiveRecord::Migration[7.2]
  def change
    remove_column :submissions, :challenge_id, :bigint
  end
end
