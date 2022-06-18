class UpdateCoursesHomepagesToVersion6 < ActiveRecord::Migration[7.0]
  def change
    update_view :courses_homepages,
      version: 6,
      revert_to_version: 5,
      materialized: true
  end
end
