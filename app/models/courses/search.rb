class Courses::Search < ApplicationRecord
  scope :by_tag, ->(tag) { where('tags @@ ?::tsquery', tag.gsub(':', '\:')) if tag.present? }

  def self.refresh
    Scenic.database.refresh_materialized_view(table_name, concurrently: false, cascade: false)
  end
end
