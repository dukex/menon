class AddIndexToCourses < ActiveRecord::Migration[7.0]
  def change
    add_index :courses, %i[status slug]
  end
end
