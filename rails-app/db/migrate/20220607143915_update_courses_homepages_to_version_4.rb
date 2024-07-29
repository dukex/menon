class UpdateCoursesHomepagesToVersion4 < ActiveRecord::Migration[7.0]
  def change
    update_view :courses_homepages,
      version: 4,
      revert_to_version: 3,
      materialized: true
  end
end
