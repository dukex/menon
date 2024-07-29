class AddFieldsToCourse < ActiveRecord::Migration[4.2]
  def change
    add_column :courses, :source_url, :string
    add_column :courses, :thumbnail_url, :string
  end
end
