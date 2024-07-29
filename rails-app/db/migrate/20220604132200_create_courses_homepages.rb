class CreateCoursesHomepages < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :featured, :boolean
    create_view :courses_homepages
  end
end
