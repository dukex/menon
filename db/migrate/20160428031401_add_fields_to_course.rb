class AddFieldsToCourse < ActiveRecord::Migration
  def change
    add_column :courses, :source_url, :string
    add_column :courses, :thumbnail_url, :string
  end
end
