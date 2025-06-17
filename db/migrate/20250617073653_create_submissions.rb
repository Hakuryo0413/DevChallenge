class CreateSubmissions < ActiveRecord::Migration[7.2]
  def change
    create_table :submissions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :challenge, null: false, foreign_key: true
      t.text :code
      t.string :status
      t.text :result
      t.integer :points

      t.timestamps
    end
  end
end
