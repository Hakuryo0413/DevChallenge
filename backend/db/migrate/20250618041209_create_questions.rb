class CreateQuestions < ActiveRecord::Migration[7.2]
  def change
    create_table :questions do |t|
      t.references :challenge, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.text :starter_code
      t.text :test_cases

      t.timestamps
    end
  end
end
