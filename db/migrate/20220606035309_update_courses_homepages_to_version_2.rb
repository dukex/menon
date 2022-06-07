class UpdateCoursesHomepagesToVersion2 < ActiveRecord::Migration[7.0]
  def change
    drop_view :courses_homepages,
              materialized: false

    create_view :courses_homepages,
                materialized: true
  end
end
