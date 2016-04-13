class AddUserIdToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :owner_id, :integer
    add_index :courses, :owner_id
  end
end
