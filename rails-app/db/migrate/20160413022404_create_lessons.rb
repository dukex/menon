class CreateLessons < ActiveRecord::Migration[4.2]
  def change
    create_table :lessons do |t|
      t.string :name
      t.string :type
      t.references :course, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
