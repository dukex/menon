class AddStatusToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :status, :string
  end
end
