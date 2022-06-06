class UpdateCoursesHomepagesToVersion2 < ActiveRecord::Migration[7.0]
  def change
    update_view :courses_homepages,
      version: 2,
      revert_to_version: 1,
      materialized: true
  end
end
