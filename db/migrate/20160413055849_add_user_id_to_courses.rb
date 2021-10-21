class AddUserIdToCourses < ActiveRecord::Migration[4.2]
  def change
    add_column :courses, :owner_id, :integer
    add_index :courses, :owner_id
  end
end
