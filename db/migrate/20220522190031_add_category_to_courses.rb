class AddCategoryToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :category, :string
  end
end
