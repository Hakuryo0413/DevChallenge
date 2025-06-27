class AddImageUrlToChallenges < ActiveRecord::Migration[7.2]
  def change
    add_column :challenges, :image_url, :text
  end
end
