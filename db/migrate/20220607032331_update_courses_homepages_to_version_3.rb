class UpdateCoursesHomepagesToVersion3 < ActiveRecord::Migration[7.0]
  def change
    update_view :courses_homepages,
      version: 3,
      revert_to_version: 2,
      materialized: true
  end
end
