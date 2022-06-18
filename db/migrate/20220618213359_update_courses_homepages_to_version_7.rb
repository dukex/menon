class UpdateCoursesHomepagesToVersion7 < ActiveRecord::Migration[7.0]
  def change
    update_view :courses_homepages,
      version: 7,
      revert_to_version: 6,
      materialized: true
  end
end
